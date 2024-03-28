import { useEffect } from "react";
import { useGoalContext } from "../hooks/useGoalContext";
import GoalDetails from "../components/goalDetails";
import GoalForm from "../components/goalform";

const Goals = () => {
    const { goals, dispatch } = useGoalContext();

    useEffect(() => {
        const fetchGoals = async () => {
            const response = await fetch('/api/goal');
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_GOALS', payload: json });
            }
        };

        fetchGoals();
    }, [dispatch]);

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
