import google.generativeai as genai
import chromadb
import numpy as np
import os
import PyPDF2
import torch
import uuid
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in the environment variables.")

genai.configure(api_key=GEMINI_API_KEY)

pdf_path = "./dataset.pdf"
embedding_file = "output_embedding.pt"
embedding_dim = 384

projection_matrix = np.random.randn(768, embedding_dim)
projection_matrix /= np.linalg.norm(projection_matrix, axis=0)

db_path = f"/content/chroma_db_{uuid.uuid4().hex[:8]}" if os.path.exists("/content") else f"./chroma_db_{uuid.uuid4().hex[:8]}"
os.makedirs(db_path, exist_ok=True)
print(f"Using ChromaDB path: {db_path}")

try:
    chroma_client = chromadb.PersistentClient(path=db_path)
    collection = chroma_client.get_or_create_collection(
        name="mental_health_chunks",
        metadata={"hnsw:space": "cosine", "dimension": embedding_dim}
    )
except Exception as e:
    print(f"ChromaDB initialization failed: {e}")
    raise

def process_pdf(pdf_path):
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF not found at {pdf_path}")
    with open(pdf_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = "".join(page.extract_text() or "" for page in pdf_reader.pages)
    chunks = [text[i:i + 500].strip() for i in range(0, len(text), 500) if text[i:i + 500].strip()]
    if not chunks:
        raise ValueError("No valid text extracted from PDF.")
    print(f"Document split into {len(chunks)} chunks.")
    return chunks

def generate_embeddings(chunks, model, projection_matrix):
    embedding_data = {}
    for i, chunk in enumerate(chunks):
        try:
            response = genai.embed_content(model=model, content=chunk, task_type="retrieval_document")
            embedding_768 = np.array(response["embedding"])
            embedding_384 = np.dot(embedding_768, projection_matrix)
            embedding_data[str(i)] = {"embedding": embedding_384.tolist(), "text": chunk}
        except Exception as e:
            print(f"Error embedding chunk {i}: {e}")
    return embedding_data

model = "models/text-embedding-004"
if os.path.exists(embedding_file):
    embedding_data = torch.load(embedding_file, weights_only=False)
else:
    chunks = process_pdf(pdf_path)
    embedding_data = generate_embeddings(chunks, model, projection_matrix)
    torch.save(embedding_data, embedding_file)

first_embedding = list(embedding_data.values())[0]["embedding"]
if len(first_embedding) != embedding_dim:
    raise ValueError(f"Embedding dimension {len(first_embedding)} != {embedding_dim}")

for i, data in embedding_data.items():
    try:
        collection.add(
            ids=[str(i)],
            embeddings=[data["embedding"]],
            metadatas=[{"text": data["text"]}]
        )
    except Exception as e:
        print(f"Error adding chunk {i} to ChromaDB: {e}")
        raise

def query_rag(query):
    try:
        query_response = genai.embed_content(model=model, content=query, task_type="retrieval_document")
        query_embedding = np.array(query_response["embedding"])
        if np.isnan(query_embedding).any() or np.all(query_embedding == 0):
            raise ValueError("Invalid query embedding.")
        query_embedding_reduced = np.dot(query_embedding, projection_matrix)
        results = collection.query(query_embeddings=[query_embedding_reduced.tolist()], n_results=3)
        if not results["metadatas"] or not results["metadatas"][0]:
            return "I couldn’t find specific advice. How else can I support you?"
        context = " ".join(doc["text"] for doc in results["metadatas"][0])
        gen_model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = (
            "You are a compassionate mental health assistant. Answer based on the context, "
            "offering empathy and practical advice. For severe distress (e.g., self-harm), "
            "suggest professional help.\n\n"
            f"Context: {context}\n\nQuestion: {query}"
        )
        response = gen_model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Sorry, an error occurred: {e}. How else can I assist?"


# response = query_rag("I am very sad.")
# print("Chatbot:", response)
