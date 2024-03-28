from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from sentence_transformers import SentenceTransformer, util
from langchain.text_splitter import CharacterTextSplitter
from PyPDF2 import PdfReader
import requests


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model
model = SentenceTransformer("sentence_transformer_model")

# Load PDF and split into chunks
def load_pdf_and_split(filename):
    try:
        pdf = PdfReader(filename)
        result = ''
        for page in pdf.pages:
            result += page.extract_text()
    except Exception as e:
        return str(e), None

    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )

    chunks = text_splitter.split_text(result)
    return None, chunks

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/answer', methods=['POST'])
def get_answer():
    try:
        # Get user question from the form
        user_question = request.form.get('question')

        # Load PDF and split into chunks
        error, chunks = load_pdf_and_split('/home/Raya/Mental-Health-Wellness-Journal/pdfReader/dataset.pdf')
        if error:
            return jsonify({'error': error}), 500

        # Encode question and chunks
        question_embedding = model.encode([user_question])
        output_embedding = model.encode(chunks)

        # Semantic search to find relevant chunk
        result = util.semantic_search(question_embedding, output_embedding, top_k=1)
        relevant_chunk = chunks[result[0][0]['corpus_id']]

        # Get AI21 API key
        AI21_api_key = 'Nk823ttZcJda9MsH9ZgL1wFS2Ct4Ltct'

        # Make request to AI21 API
        url = "https://api.ai21.com/studio/v1/answer"
        payload = {
            "context": relevant_chunk,
            "question": user_question
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "Authorization": f"Bearer {AI21_api_key}"
        }
        response = requests.post(url, json=payload, headers=headers)

        if response.ok:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to get answer from AI21 API'}), response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
