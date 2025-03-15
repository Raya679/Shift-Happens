import { useEffect } from "react";
import { useGoalContext } from "../hooks/useGoalContext";
import { useAuthContext } from "../hooks/useAuthContext";
import GoalDetails from "../components/goalDetails";
import GoalForm from "../components/goalform";
import SideBar from "../components/sidebar";
import bg from "../pictures/duplo24.jpeg";

const Goals = () => {
  const { goals, dispatch } = useGoalContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchGoals = async () => {
      if (user) {
        const response = await fetch("/api/goals", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_GOALS", payload: data });
        }
      }
    };
    fetchGoals();
  }, [user, dispatch]);

  return (
    <div className="flex min-h-screen text-white">
      {user && (
        <>
          <div className="fixed top-0 left-0 h-full w-64 bg-slate-800 shadow-lg">
            <SideBar />
          </div>

          <div
            className="flex-grow ml-64 p-6"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6 text-slate-900">
                Set A Goal
              </h2>
            </div>

            <div className="mt-5 w-full flex justify-center items-center max-w-3xl mx-auto p-6 rounded-xl">
              <GoalForm />
            </div>

            <div className="mt-10 w-full max-w-6xl mx-auto">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-6 text-slate-900">
                  Your Goals
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {goals &&
                  goals.map((goal) => (
                    <GoalDetails goal={goal} key={goal._id} />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Goals;
