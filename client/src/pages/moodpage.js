import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";
Chart.register(LinearScale, CategoryScale);

function Mood() {
  const [moodsData, setMoodsData] = useState([]);
  const [answers, setAnswers] = useState({
    moodss: "",
    sleep: "",
    stress: "",
  });

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
      await axios.post("/api/moods", answers);
      setAnswers({
        moodss: "",
        sleep: "",
        stress: "",
      });
    } catch (error) {
      console.error("Error submitting mood:", error);
    }
  };

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await axios.get("/api/moods");
        setMoodsData(response.data);
      } catch (error) {
        console.error("Error fetching moods:", error);
      }
    };

    fetchMoods();
  }, []);

  const moodssData = moodsData.map((mood) => mood.moodss);
  const sleepData = moodsData.map((mood) => mood.sleep);
  const stressData = moodsData.map((mood) => mood.stress);
  const labels = moodsData.map((mood) => mood.createdAt);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Mood Rating",
        data: moodssData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Sleep Hours",
        data: sleepData,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Stress Level",
        data: stressData,
        fill: false,
        borderColor: "rgb(153, 102, 255)",
        tension: 0.1,
      },
    ],
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
                value={answers.job}
                onChange={(e) =>
                  onOptionChange(
                    ["moodss", "sleep", "stress"][index],
                    e.target.value
                  )
                }
                className=" bg-gray-700 border-gray-400 border-4 rounded-[40px] w-1/2 text-white py-2 px-10 mb-5"
              >
                <option value="" disabled hidden>
                  Rate it on a scale of 10
                </option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={infoSubmit}
        className="bg-gray-700 text-1xl font-bold mt-3 mb-9 py-2 px-4 rounded-[10px] border-4 border-gray-400 ml-auto mr-40 w-min text-white"
      >
        SUBMIT
      </div>
      <div className="mx-20 my-28 bg-slate-300">
        <Line data={data} />
      </div>
    </div>
  );
}

export default Mood;
