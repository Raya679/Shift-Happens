import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";
// import { format } from "date-fns";
Chart.register(LinearScale, CategoryScale);


function MoodGraph() {
  const [moodsData, setMoodsData] = useState([]);

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
//   const labels = moodsData.map((mood) => mood.createdAt);
const labels = moodsData.map((mood) => new Date(mood.createdAt).toLocaleDateString());

//   console.log("Labels array:", labels);

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



  //did not process the dates properly


//   const options = {
//     scales: {
//       x: {
//         ticks: {
//           // Customize the date/time format for X-axis labels
//           callback: function (value, index, values) {
//             return format(new Date(value), "MM/dd/yyyy"); // Example format, adjust as needed
//           },
//         // callback: function (value, index, values) {
//         //     return new Date(value).toLocaleDateString(); // Example format, adjust as needed
//         //   },
//         },
//       },
//     },
//   };

  return (
    <div className="mx-20 my-28 bg-slate-300" style={{ maxWidth: "80%" }} >
      <Line data={data}  />
    </div>
  );
}

export default MoodGraph;