import { useState } from "react";
import { useGoalContext } from "../hooks/useGoalContext";
import { useAuthContext } from "../hooks/useAuthContext";

const GoalForm = () => {
    const {dispatch}= useGoalContext();
    const {user}=useAuthContext();

    const [activities, setActivities] = useState('')
    const [duration, setDuration]=useState('')
    const [requirements, setRequirements]=useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields]=useState([])

    const handleSubmit = async (e) => {
        e.preventDefault() 

        if (!user) {
            setError('You must be logged in')
            return
          }

        const goal = {activities, duration, requirements}

        const response = await fetch('/api/goals/add', {
            method: 'POST',
            body: JSON.stringify(goal),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok) 
        {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok)
        {
            setEmptyFields([])
            setError(null)
            setActivities('')
            setDuration('')
            setRequirements('')
            dispatch({type: 'CREATE_GOALS', payload: json})
        }

    }

    return (
        // <div className="flex justify-center m-10">
        // <div className="h-full w-3/4 bg-slate-100 rounded-3xl p-20">
        // <form onSubmit={handleSubmit} className="grid grid-cols-1">
        //     <h3 className='font-serif text-center font-extrabold text-3xl'>Set A Goal</h3>
        //     <br></br>
        //     <label>Activity Name: 
        //     <input 
        //     type="text"
        //     onChange={(e) => setActivities(e.target.value)}
        //     value={activities}
        //     className={emptyFields.includes('activities') ? 'error' : ''}
        //     // className='ml-10  border-slate-500'
        //     />
        //     </label>
        //     <br></br>
        //     <label>Duration (in mins): 
        //         <input 
        //         type="number"
        //         onChange={(e) => setDuration(e.target.value)}
        //         value={duration}
        //         className={emptyFields.includes('duration') ? 'error' : ''}
        //         // className='ml-10  border-slate-500'
        //         />
        //     </label>
        //     <br></br>
        //     <label>Prerequisite: 
        //     <input 
        //     type="text"
        //     onChange={(e) => setRequirements(e.target.value)}
        //     value={requirements}
        //     className={emptyFields.includes('requirements') ? 'error' : ''}
        //     // className='ml-10 border-slate-500'
        //     />
        //     </label>
        //     <br></br>
        //     <div className='w-full flex justify-center'>
        //     <button className='bg-slate-500 hover:bg-slate-800 w-36 p-3 rounded-md text-center text-white'>Add Goal</button>
        //     </div>
        //     {error && <div className="error">{error}</div>}
        // </form>
        // </div>
        // </div>

        <div className="flex justify-center m-10">
        <div className="max-w-lg w-full bg-slate-100 rounded-3xl p-10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <h3 className='font-serif text-center font-extrabold text-3xl'>Set A Goal</h3>

            <label htmlFor="activityName">Activity Name:</label>
            <input 
                type="text"
                id="activityName"
                onChange={(e) => setActivities(e.target.value)}
                value={activities}
                className={`input-field ${emptyFields.includes('activities') ? 'error' : ''}`}
            />

            <label htmlFor="duration">Duration (in mins):</label>
            <input 
                type="number"
                id="duration"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
                className={`input-field ${emptyFields.includes('duration') ? 'error' : ''}`}
            />

            <label htmlFor="prerequisite">Prerequisite:</label>
            <input 
                type="text"
                id="prerequisite"
                onChange={(e) => setRequirements(e.target.value)}
                value={requirements}
                className={`input-field ${emptyFields.includes('requirements') ? 'error' : ''}`}
            />

            <div className='flex justify-center'>
                <button className='btn bg-slate-300 hover:bg-slate-400 p-1.5 rounded-7'>Add Goal</button>
            </div>

            {error && <div className="error">{error}</div>}
            </form>
        </div>
        </div>

    )
}

export default GoalForm