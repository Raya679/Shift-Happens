import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";
import { useAuthContext } from "../hooks/useAuthContext";

Chart.register(LinearScale, CategoryScale);

function MoodGraph() {
  const { user } = useAuthContext();
  const [moodsData, setMoodsData] = useState([]);

  useEffect(() => {
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
    fetchMoods();
  }, [user]);

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
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Sleep Hours",
        data: sleepData.slice().reverse(),
        fill: false,
        borderColor: "#FF6384",
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Stress Level",
        data: stressData.slice().reverse(),
        fill: false,
        borderColor: "#9966FF",
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Rating",
          font: {
            size: 16,
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-10">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Mood Statistics
      </h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default MoodGraph;
