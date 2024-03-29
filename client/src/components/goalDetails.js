import { useGoalContext } from "../hooks/useGoalContext";
import { useAuthContext } from "../hooks/useAuthContext";
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const GoalDetails = ({goal}) => {
    const {dispatch} = useGoalContext()
    const {user} = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return
          }

        const response = await fetch('/api/goals/' + goal._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
              }
        });

        const json = await response.json()
    
        if (response.ok) {
            // No need to parse an empty response
            dispatch({ type: 'DELETE_GOALS', payload: json });
        } else {
            // Handle non-successful response (e.g., show an error message)
            console.error('Error deleting goal:', response.statusText);
        }
    };
    

    return (
        <div>
            {user && (
        <div className="w-full flex justify-center m-5 pt-4 goaldesign">
        <div className='bg-slate-100 p-4 w-1/2 rounded-xl font-medium text-black'>
            {/* <h4 className="activity-name">Activity name: {goal.activities}</h4> */}
            <h4>
                <span className="activity-name ">Activity name:</span> {goal.activities}
            </h4>
            <p> <span className="activity-name">Duration (in mins):</span> {goal.duration}</p>
            <p> <span className="activity-name">Prerequisites: </span>{goal.requirements}</p>
            {/* <p>{formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}</p> */}
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
        </div>
        )}
        </div>
    )
}

export default GoalDetails