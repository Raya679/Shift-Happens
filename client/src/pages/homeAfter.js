import { useAuthContext } from "../hooks/useAuthContext";
import { useGoalContext } from "../hooks/useGoalContext";
import { useEffect } from "react";
import MoodGraph from "./moodGraph";
import SideBar from "../components/sidebar";
import bg from "../pictures/duplo24.jpeg";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";

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

  const upcomingGoals = goals
  ? goals.filter(goal => {
      const hasHighImportance = goal.importance >= 5;

      if (!goal.deadline) {
        return hasHighImportance;
      }

      const goalDate = new Date(goal.deadline);
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const hasNearDeadline = goalDate >= today && goalDate <= nextWeek;

      return hasHighImportance && hasNearDeadline;
    })
    .slice(0, 3)
  : [];


  
  const handleDelete = async (goalId) => {
    console.log(`Delete clicked for goal ID: ${goalId}`);
  
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        },
      });
  
      if (!response.ok) {
        const json = await response.json();
        console.error("Delete failed:", json.error);
        return;
      }
  
      console.log(`Goal ${goalId} deleted successfully`);
  
      dispatch({ 
        type: "SET_GOALS", 
        payload: [...goals.filter(goal => goal._id !== goalId)] 
      });
  
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
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
              UPCOMING GOALS
            </h3>
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {goals && upcomingGoals.length > 0? (       
                  upcomingGoals.map((goal) => (
                    <div className="w-full flex justify-center p-4">
                      <div 
                        className="bg-white p-6 w-96 h-64 rounded-2xl shadow-lg flex flex-col justify-between text-black transform transition duration-300 hover:scale-105"
                        key={goal._id}
                      >
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">
                            {goal.activities}
                          </h4>

                          <p className="text-lg text-gray-600">
                            <span className="font-semibold">Duration:</span> {goal.duration} mins
                          </p>

                          {/* <p className="text-lg text-gray-600">
                            <span className="font-semibold">Prerequisites:</span>{" "}
                            {goal.requirements ? goal.requirements : "--"}
                          </p>   */}

                          <p className="text-lg text-gray-600">
                            <span className="font-semibold">Deadline: </span> 
                            {goal.deadline ? format(new Date(goal.deadline), 'PPP') : " --"}
                          </p>  

                          <p className="text-lg text-gray-600">
                            <span className="font-semibold">Priority:</span> {goal.importance}
                          </p>
                        </div>
                     
                        <div className="flex justify-end">
                          <button onClick={() => handleDelete(goal._id)} className="focus:outline-none">
                            <FaTrashAlt className="text-slate-500 text-3xl cursor-pointer hover:text-slate-600 transition" />
                          </button>
                        </div>
                      </div>
                    </div>


                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-600">
                    <p>No upcoming goals</p>
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

            {/* <div className="absolute inset-0 bg-gray-300 opacity-10 rounded-lg"></div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeAfter;
