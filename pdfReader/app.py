from flask import Flask, request, jsonify
import main
from main import get_response_from_query
from flask_cors import CORS

app =  Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "Welcome to Shift Happens"

@app.route("/answer_to/", methods=['GET','POST'])
def answer_to():
    answer = None
    if request.method == 'POST':
        user_question = request.form['question'] #query

        answer = get_response_from_query(user_question)
    
    return jsonify({'answer': answer})

if __name__ == "__main__":
    app.run(debug=True)
