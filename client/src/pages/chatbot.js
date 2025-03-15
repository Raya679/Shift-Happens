import { useState, useEffect } from "react";
import axios from "axios";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sidebar";
import bg from "../pictures/duplo24.jpeg";
import ReactMarkdown from "react-markdown";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Roboto, sans-serif",
  headerBgColor: "#1E293B",
  headerFontColor: "white",
  headerFontSize: "100%",
  botBubbleColor: "#fff",
  botFontColor: "#1E293B",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const FetchAnswer = ({ steps, triggerNextStep }) => {
  const [answer, setAnswer] = useState("...");
  const [error, setError] = useState(null);

  const fetchAnswer = async (question) => {
    try {
      const response = await axios.post("http://localhost:5000/answer_query/", {
        query: question,
      });

      if (response.status === 200) {
        // console.log(response)
        setAnswer(response.data || "No relevant answer found.");
        setError(null);
        triggerNextStep({ trigger: "waiting2" });
      } else {
        setError(response.data.detail || "Error fetching response.");
      }
    } catch (error) {
      setError("An error occurred while fetching the answer.");
    }
  };

  useEffect(() => {
    let userQuery = "";
    userQuery = steps.waiting2.value;
    if (userQuery) {
      fetchAnswer(userQuery);
    } else {
      setError("No question provided.");
    }
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <p>{error ? `Error: ${error}` : <ReactMarkdown>{answer}</ReactMarkdown>}</p>
  );
};

function ChatbotFeature({ setResult }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const steps = [
    {
      id: "Welcome",
      message: "Hello! How can I help you?",
      trigger: "waiting2",
    },
    { id: "waiting2", user: true, trigger: "FetchAnswer" },
    {
      id: "FetchAnswer",
      component: (
        <FetchAnswer
          triggerNextStep={() => {}}
          steps={{}}
          setResult={setResult}
        />
      ),
      asMessage: true,
    },
  ];

  return (
    <div
      className="relative flex min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {user && (
        <>
          <div className="fixed top-0 left-0 z-50">
            <SideBar />
          </div>
  
          <div className="flex-grow ml-64 p-6 flex flex-col items-center justify-center relative z-0">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Your Virtual Assistant
            </h2>
  
            <ThemeProvider theme={theme}>
              <div className="relative z-0"> 
                <ChatBot
                  height="40em"
                  width="70em"
                  headerTitle="Chat Assistant"
                  steps={steps}
                  placeholder="Enter your query..."
                />
              </div>
            </ThemeProvider>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatbotFeature;
