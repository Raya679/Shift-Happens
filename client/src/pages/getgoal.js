import { useEffect } from "react";
import { useGoalContext } from "../hooks/useGoalContext";
import GoalDetails from "../components/goalDetails";
import GoalForm from "../components/goalform";
import { useAuthContext } from "../hooks/useAuthContext";

const Goals = () => {
    const { goals, dispatch } = useGoalContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchGoals = async () => {
            const response = await fetch('/api/goals', {
                headers: {'Authorization': `Bearer ${user.token}`},
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_GOALS', payload: json });
            }
        }

        if(user){
        fetchGoals()
        }
    }, [dispatch, user]);

    return (
        <div className='pt-32'>
            <div >
                {goals && goals.map(goal => (
                    <GoalDetails goal={goal} key={goal._id} />
                ))}
            </div>

            <GoalForm />
        </div>
    );
};

export default Goals;
