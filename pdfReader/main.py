import torch
import numpy as np
from sentence_transformers import SentenceTransformer, util
from langchain.text_splitter import CharacterTextSplitter
from bs4 import BeautifulSoup
import requests
from PyPDF2 import PdfReader

try:
    pdf = PdfReader('pdfReader/dataset.pdf')  
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

# Load the model
# model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
# model.save("sentence_transformer_model")

model = SentenceTransformer("sentence_transformer_model")


def query(texts):
    embeddings = model.encode(texts)
    return embeddings

user_question = 'I am feeling sad. What should I do?'

question_embedding = query([user_question])

output_embedding = query(chunks)

result = util.semantic_search(question_embedding, output_embedding, top_k=2)
# print(result)

final = [chunks[result[0][i]['corpus_id']] for i in range(len(result[0]))]

AI21_api_key = 'Nk823ttZcJda9MsH9ZgL1wFS2Ct4Ltct'
url = "https://api.ai21.com/studio/v1/answer"

payload = {
    "context": ' '.join(final),
    "question": user_question
}

headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "Authorization": f"Bearer {AI21_api_key}"
}

response = requests.post(url, json=payload, headers=headers)

if response.json()['answerInContext']:
    print(response.json()['answer'])
else:
    print('The answer is not found in the document ⚠️, '
          'please reformulate your question.')
