import { useState } from "react";
import { useGoalContext } from "../hooks/useGoalContext";
import { useAuthContext } from "../hooks/useAuthContext";

const GoalForm = () => {
  const { dispatch } = useGoalContext();
  const { user } = useAuthContext();

  const [activities, setActivities] = useState("");
  const [duration, setDuration] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const goal = { activities, duration, requirements };

    const response = await fetch("/api/goals/add", {
      method: "POST",
      body: JSON.stringify(goal),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }

    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setActivities("");
      setDuration("");
      setRequirements("");
      dispatch({ type: "CREATE_GOALS", payload: json });
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label htmlFor="activityName" className="text-gray-700 font-medium">
            Activity Name:
          </label>
          <input
            type="text"
            id="activityName"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black ${
              emptyFields.includes("activities")
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter activity name"
          />
        </div>

        <div>
          <label htmlFor="duration" className="text-gray-700 font-medium">
            Duration (in mins):
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black ${
              emptyFields.includes("duration")
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter duration"
          />
        </div>

        <div>
          <label htmlFor="prerequisite" className="text-gray-700 font-medium">
            Prerequisite:
          </label>
          <input
            type="text"
            id="prerequisite"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black ${
              emptyFields.includes("requirements")
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter prerequisites"
          />
        </div>

        <div className="flex justify-center">
          <button className="bg-slate-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 hover:bg-slate-800">
            Add Goal
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-400 p-3 rounded-lg text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default GoalForm;
