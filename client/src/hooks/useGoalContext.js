import { GoalContext } from "../context/goalContext";
import { useContext } from "react";

export const useGoalContext = () => {
    const context = useContext(GoalContext)

    if(!context)
    {
        throw Error('useGoalContext must be inside a GoalContextProvider')
    }

    return context
}