import { useGoalContext } from "../hooks/useGoalContext";
import { useAuthContext } from "../hooks/useAuthContext";
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const GoalDetails = ({goal}) => {
    const {dispatch} = useGoalContext()
    const {user} = useAuthContext();

    const handleClick = async () => {
        const response = await fetch('/api/goal/' + goal._id, {
            method: 'DELETE'
        });
    
        if (response.ok) {
            // No need to parse an empty response
            dispatch({ type: 'DELETE_GOALS', payload: goal._id });
        } else {
            // Handle non-successful response (e.g., show an error message)
            console.error('Error deleting goal:', response.statusText);
        }
    };
    

    return (
        <div>
            {user && (
        <div className="w-full flex justify-center m-5 pt-4">
        <div className='bg-slate-100 p-2 w-1/2 rounded-xl'>
            <h4><strong>Activity name: </strong>{goal.activities}</h4>
            <p><strong>Duration (in mins): </strong>{goal.duration}</p>
            <p><strong>Prerequisites: </strong>{goal.requirements}</p>
            {/* <p>{formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}</p> */}
            {/* <span className="material-symbols-outlined" onClick={handleClick}>delete</span> */}
        </div>
        </div>
        )}
        </div>
    )
}

export default GoalDetails