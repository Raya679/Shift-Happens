import { useAuthContext } from "../hooks/useAuthContext";
import { useGoalContext } from "../hooks/useGoalContext";
import { useEffect } from "react";
import MoodGraph from "./moodGraph";
import SideBar from "../components/sidebar";
import bg from "../pictures/duplo24.jpeg";

document.body.style = "background: #f0f4f8";

const HomeAfter = () => {
  const { user } = useAuthContext();
  const { goals, dispatch } = useGoalContext();

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch("/api/goals", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_GOALS", payload: json });
      }
    };

    if (user) {
      fetchGoals();
    }
  }, [dispatch, user]);

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
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Welcome to Shift Happens, {user.username}
            </h2>
            <div className="flex flex-col items-center my-4">
              <img
                src="dashboard.png"
                alt="Motivational"
                className="h-72 w-86 max-w-md rounded-lg transition-transform duration-200 transform hover:scale-105"
              />
              <div className="text-center mt-4 px-4">
                <h4 className="font-semibold text-xl italic text-gray-700">
                  "Our greatest weakness lies in giving up. The most certain way
                  to succeed is always to try just one more time."
                </h4>
                <h4 className="text-sm text-gray-500">~ Thomas Edison</h4>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-16 mb-4 text-gray-800 text-center">
              MY GOALS
            </h3>
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {goals && goals.length > 0 ? (
                  goals.map((goal) => (
                    <div
                      className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                      key={goal._id}
                    >
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">
                        Activity:{" "}
                        <span className="font-medium">{goal.activities}</span>
                      </h4>
                      <p className="text-gray-700 mb-1">
                        <strong>Duration:</strong> {goal.duration} mins
                      </p>
                      <p className="text-gray-700 mb-4">
                        <strong>Prerequisites:</strong> {goal.requirements}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-600">
                    <p>No goals added yet</p>
                  </div>
                )}
              </div>
            </div>

            <div
              className="mt-8"
              style={{ maxWidth: "800px", margin: "0 auto" }}
            >
              <h3 className="text-2xl mt-16 font-semibold mb-4 text-gray-800 text-center">
                MY MOOD STATS
              </h3>
              <MoodGraph />
            </div>

            <div className="absolute inset-0 bg-gray-300 opacity-10 rounded-lg"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeAfter;
