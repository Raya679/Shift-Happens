import torch
import numpy as np
from sentence_transformers import SentenceTransformer, util
from langchain.text_splitter import CharacterTextSplitter
from bs4 import BeautifulSoup
import requests
from PyPDF2 import PdfReader

try:
    pdf = PdfReader('./dataset.pdf')  
    result = ''
    for i in range(len(pdf.pages)):
        result += pdf.pages[i].extract_text()
except Exception as e:
    print('Error:', e)
    exit(0)

text_splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len
)
chunks = text_splitter.split_text(result)

model = SentenceTransformer("sentence_transformer_model")
AI21_api_key = 'Nk823ttZcJda9MsH9ZgL1wFS2Ct4Ltct'
url = "https://api.ai21.com/studio/v1/answer"

def query(texts):
    embeddings = model.encode(texts)
    return embeddings

def get_output_embedding(chunks):
    try:
        output_embedding = torch.load('output_embedding.pt')
    except FileNotFoundError:
        output_embedding = query(chunks)
        torch.save(output_embedding, 'output_embedding.pt')
    return output_embedding

def get_response_from_query(user_query):
    question_embedding = query([user_query])
    output_embedding = get_output_embedding(chunks)
    result = util.semantic_search(question_embedding, output_embedding, top_k=2)
    final = [chunks[result[0][i]['corpus_id']] for i in range(len(result[0]))]

    payload = {
        "context": ' '.join(final),
        "question": user_query
    }
    
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"Bearer {AI21_api_key}"
    }

    response = requests.post(url, json=payload, headers=headers)
    print("Response", response)
   
    if response.json()['answerInContext']:
        return response.json()['answer']
    else:
        print('The answer is not found in the document ⚠️, '
              'please reformulate your question.')
    
# user_query = "I am sad. What should I do?"
# print(get_response_from_query(user_query))





