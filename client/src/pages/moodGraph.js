import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
Chart.register(LinearScale, CategoryScale);

function Mood() {
  const { user } = useAuthContext();
  const [moodsData, setMoodsData] = useState([]);
  const [answers, setAnswers] = useState({
    moodss: null,
    sleep: "",
    stress: "",
  });
  const [error, setError] = useState(null);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [consecutiveGoodEntries, setConsecutiveGoodEntries] = useState(0);
  const [numEntries, setNumEntries] = useState(10); // Number of entries to display
  const navigate = useNavigate();

  const QUESTIONS = [
    "How much would you rate your mood today on a scale of 10? (1 being the lowest and 10 the highest)",
    "How many hours did you sleep approximately?",
    "On a scale of 10, how stressful was your day? (1 being the lowest and 10 the highest)",
  ];

  const onOptionChange = (field, value) => {
    setAnswers((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const infoSubmit = async () => {
    try {
      await axios.post("/api/moods/add", answers, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });
      setMoodsData(prevData => [
        ...prevData,
        { moodss: answers.moodss, sleep: answers.sleep, stress: answers.stress, createdAt: new Date() }
      ]);
      setAnswers({
        moodss: 1,
        sleep: 1,
        stress: 1,
      });
      setError(null);
    } catch (error) {
      console.error("Error submitting mood:", error);
      setError("Error submitting mood. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        if (user && user.token) {
          const response = await axios.get("/api/moods", {
            headers: {
              'Authorization': `Bearer ${user.token}`,
            }
          });
          setMoodsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching moods:", error);
      }
    };

    fetchMoods();
  }, [user]);


  const analyzeData = () => {
    const thresholdStress = 7;
    const thresholdSleep = 5;
    const consecutiveGoodSleepDays = 3;

    let consecutiveStressDays = 0;
    let consecutiveSleeplessNights = 0;
    let consecutiveGoodSleep = 0;
    let consecutiveLowStress = 0;

    for (let i = 0; i < moodsData.length; i++) {
      const mood = moodsData[i];

      if (mood.stress >= thresholdStress) {
        consecutiveStressDays++;
        consecutiveLowStress = 0;
      } else {
        consecutiveStressDays = 0;
        consecutiveLowStress++;
      }

      if (mood.sleep <= thresholdSleep) {
        consecutiveSleeplessNights++;
        consecutiveGoodSleep = 0;
      } else {
        consecutiveSleeplessNights = 0;
        consecutiveGoodSleep++;
      }

      if (consecutiveGoodSleep >= consecutiveGoodSleepDays && consecutiveLowStress >= consecutiveGoodSleepDays) {
        setShowHelpPopup(false);
        return;
      }

      if (consecutiveStressDays >= 3 || consecutiveSleeplessNights >= 3) {
        setShowHelpPopup(true);
        setConsecutiveGoodEntries(0);
        return;
      } else {
        setConsecutiveGoodEntries((prevCount) => prevCount + 1);
      }
    }

    if (consecutiveGoodEntries >= 3) {
      setShowHelpPopup(false);
    }
  };
  useEffect(() => {
    analyzeData();
  }, [moodsData]);

  const moodssData = moodsData.map((mood) => mood.moodss);
  const sleepData = moodsData.map((mood) => mood.sleep);
  const stressData = moodsData.map((mood) => mood.stress);
  const labels = moodsData.map((mood) => mood.createdAt);

  // Adjusting the data to display only the desired number of entries
  const limitedMoodssData = moodssData.slice(-numEntries).reverse();
  const limitedSleepData = sleepData.slice(-numEntries).reverse();
  const limitedStressData = stressData.slice(-numEntries).reverse();
  const limitedLabels = labels.slice(-numEntries).reverse();

  const data = {
    labels: limitedLabels,
    datasets: [
      {
        label: "Mood Rating",
        data: limitedMoodssData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Sleep Hours",
        data: limitedSleepData,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Stress Level",
        data: limitedStressData,
        fill: false,
        borderColor: "rgb(153, 102, 255)",
        tension: 0.1,
      },
    ],
  };

  const handleHelpPopupCancel = () => {
    setShowHelpPopup(false);
  };

  const handleHelpPopupConfirm = () => {
    navigate("/help");
  };

  const handleNumEntriesChange = (value) => {
    setNumEntries(value);
  };

  return (
    <div>
      <div className="pt-36">
        <div className="flex justify-center">
          <h1 className="font-extrabold text-4xl font-serif color">
            Mood-Tracker
          </h1>
        </div>
      </div>

      <div>
        {QUESTIONS.map((question, index) => (
          <div
            key={index}
            className=" rounded-full mx-20 mt-20 bg-slate-300 px-9 py-7 shadow-xl"
          >
            <div className="font-oswald font-semibold text-xl py-3">
              {question}
            </div>
            <div>
              <select
                value={answers[`moodss`]}
                onChange={(e) =>
                  onOptionChange(
                    ["moodss", "sleep", "stress"][index],
                    e.target.value
                  )
                }
                className=" bg-gray-700 border-gray-400 border-4 rounded-[40px] w-1/2 text-white py-2 px-10 mb-5"
              >
                <option value="1">1</option>
                {[...Array(9)].map((_, i) => (
                  <option key={i + 2} value={i + 2}>
                    {i + 2}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={infoSubmit}
        className="bg-gray-700 text-1xl font-bold mt-3 mb-9 py-2 px-4 rounded-[10px] border-4 border-gray-400 ml-auto mr-40 w-min text-white cursor-pointer"
      >
        SUBMIT
      </div>
      {error && <div className="text-red-500 mx-20">{error}</div>}
      <div className="mx-20 my-28 bg-slate-300">
        <Line data={data} />
      </div>
      {showHelpPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-xl font-bold mb-4">
              Let Us Help You?
            </p>
            <div className="flex justify-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4"
                onClick={handleHelpPopupCancel}
              >
                No
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleHelpPopupConfirm}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          className={`mx-2 ${numEntries === 10 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => handleNumEntriesChange(10)}
        >
          10 Entries
        </button>
        <button
          className={`mx-2 ${numEntries === 20 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => handleNumEntriesChange(20)}
        >
          20 Entries
        </button>
        <button
          className={`mx-2 ${numEntries === 30 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => handleNumEntriesChange(30)}
        >
          30 Entries
        </button>
      </div>
    </div>
  );
}

export default Mood;