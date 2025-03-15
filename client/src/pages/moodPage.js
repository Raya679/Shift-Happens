import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sidebar";
import bg from "../pictures/duplo24.jpeg";

Chart.register(LinearScale, CategoryScale);

const Mood = () => {
  const { user } = useAuthContext();
  const [moodsData, setMoodsData] = useState([]);
  const [answers, setAnswers] = useState({ moodss: "", sleep: "", stress: "" });
  const [error, setError] = useState(null);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const navigate = useNavigate();

  const QUESTIONS = [
    "Rate your mood today (1 - lowest, 10 - highest)",
    "Approximate hours of sleep?",
    "Stress level today (1 - lowest, 10 - highest)?",
  ];

  const fetchMoods = async () => {
    try {
      if (user && user.token) {
        const response = await axios.get("/api/moods", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMoodsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching moods:", error);
    }
  };

  useEffect(() => {
    if (user) fetchMoods();
  }, [user]);

  const infoSubmit = async () => {
    try {
      await axios.post("/api/moods/add", answers, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setAnswers({ moodss: "", sleep: "", stress: "" });
      setError(null);
      await fetchMoods();
    } catch (error) {
      console.error("Error submitting mood:", error);
      setError("Error submitting mood. Please try again later.");
    }
  };

  const analyzeData = () => {
    if (moodsData.length === 0) {
      setShowHelpPopup(false);
      return;
    }

    const lastMood = moodsData[0];
    const thresholdStress = 7;
    const thresholdMood = 4;
    console.log(lastMood.stress);

    if (
      lastMood.stress >= thresholdStress &&
      lastMood.moodss <= thresholdMood
    ) {
      setShowHelpPopup(true);
    } else {
      setShowHelpPopup(false);
    }
  };

  useEffect(() => {
    analyzeData();
  }, [moodsData]);

  const moodssData = moodsData.map((mood) => mood.moodss);
  const sleepData = moodsData.map((mood) => mood.sleep);
  const stressData = moodsData.map((mood) => mood.stress);
  const labels = moodsData
    .map((mood) => {
      const date = new Date(mood.createdAt);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    })
    .reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "Mood Rating",
        data: moodssData.slice().reverse(),
        fill: false,
        borderColor: "#4BC0C0",
        tension: 0.1,
      },
      {
        label: "Sleep Hours",
        data: sleepData.slice().reverse(),
        fill: false,
        borderColor: "#FF6384",
        tension: 0.1,
      },
      {
        label: "Stress Level",
        data: stressData.slice().reverse(),
        fill: false,
        borderColor: "#9966FF",
        tension: 0.1,
      },
    ],
  };

  const handleHelpPopupCancel = () => setShowHelpPopup(false);

  const onOptionChange = (questionKey, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionKey]: value,
    }));
  };

  return (
    <div
      className="flex min-h-screen"
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
          <div className="flex-grow ml-64 p-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Mood Tracker
            </h2>
            <div className="flex flex-col items-center justify-center">
              {QUESTIONS.map((question, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg mb-4 w-full max-w-lg"
                >
                  <h3 className="font-semibold text-xl">{question}</h3>
                  <select
                    value={answers[["moodss", "sleep", "stress"][index]]}
                    onChange={(e) =>
                      onOptionChange(
                        ["moodss", "sleep", "stress"][index],
                        e.target.value
                      )
                    }
                    className="mt-3 block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Rate it on a scale of 10</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={infoSubmit}
                className="bg-slate-800 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition"
              >
                Submit
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-center mt-4">{error}</div>
            )}
            <div className="mt-10 bg-white rounded-lg shadow-lg p-6 w-3/5  mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
                Mood Statistics
              </h3>
              <div className="h-72 ">
                <Line data={data} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            {showHelpPopup && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96 relative">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={handleHelpPopupCancel}
                  >
                    ✖
                  </button>

                  <p className="text-xl font-bold text-center">Need Help?</p>

                  <div className="flex flex-col items-center mt-6 space-y-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
                      onClick={() => navigate("/chatbot")}
                    >
                      Chat with Virtual Friend
                    </button>

                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition"
                      onClick={() => navigate("/meditate")}
                    >
                      Meditate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Mood;
