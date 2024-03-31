import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function ChatBotPage() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {user} = useAuthContext();

  const fetchAnswerFromModel = async () => {
    setLoading(true);
    try {
      console.log("Fetching answer for query:", question);

      const formData = new FormData();
      formData.append("question", question);

      const response = await fetch(`http://127.0.0.1:5000/answer_to/`, {
        method: "POST",
        body: formData,
      });
      console.log("Response:", response);

      const data = await response.json();
      console.log("Data:", data);

      if (response.ok) {
        setAnswer(data.answer);
        setError(null);
      } else {
        setError(data.answer || "An error occurred.");
      }
    } catch (error) {
      console.error("Error fetching answer:", error);
      setError("An error occurred while fetching the answer.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAnswerFromModel();
  };

  return (
    <div>
    {user && (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
            Enter question:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="question"
            type="text"
            placeholder="Type your question here..."
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading}>
            {loading ? 'Loading...' : 'Ask'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {answer && (
        <div className="w-1/2 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4" role="alert">
          <p className="font-bold">Answer:</p>
          <p>{answer}</p>
        </div>
      )}
    </div>
    )}
    </div>
  );
}

export default ChatBotPage;
