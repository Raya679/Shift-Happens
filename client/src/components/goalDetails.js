import { useGoalContext } from "../hooks/useGoalContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns"; 

const GoalDetails = ({ goal }) => {
  const { dispatch } = useGoalContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) return;

    const response = await fetch("/api/goals/" + goal._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_GOALS", payload: json });
    } else {
      console.error("Error deleting goal:", response.statusText);
    }
  };

  return (
    <div>
      {user && (
        <div className="w-full flex justify-center p-4">
          <div className="bg-white p-6 w-96 h-64 rounded-2xl shadow-lg flex flex-col justify-between text-black transform transition duration-300 hover:scale-105">
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {goal.activities}
              </h4>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Duration:</span> {goal.duration}{" "}
                mins
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Prerequisites:</span>{" "}
                {goal.requirements ? goal.requirements : "--"}
              </p>         
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Deadline:</span> 
                {goal.deadline ? format(new Date(goal.deadline), 'PPP') : " --"}
              </p>      
              <p className="text-lg text-gray-600">
                  <span className="font-semibold">Importance:</span>{" "}
                  {goal.importance}
              </p>
            </div>

            {/* Delete Icon */}
            <div className="flex justify-end">
              <FaTrashAlt
                className="text-slate-500 text-3xl cursor-pointer hover:text-slate-600 transition"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalDetails;
