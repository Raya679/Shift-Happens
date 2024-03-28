import { createContext, useReducer} from "react";

export const GoalContext = createContext()

export const GoalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GOALS':
            return {
                goals: action.payload
            };
        case 'CREATE_GOALS':
            return {
                goals: [action.payload, ...state.goals] // Fix: state.goals instead of state.goal
            };
        case 'DELETE_GOALS':
            return {
                goals: state.goals.filter(g => g._id !== action.payload._id)
            };
        default:
            return state;
    }
};


export const GoalContextProvider = ({ children}) => {
    const [state, dispatch] = useReducer(GoalReducer, {
        goals: null
    })

    // useEffect (()=>{
    //     const goal = JSON.parse(localStorage.getItem('goal'))
    
    //     if(goal)
    //     {
    //         dispatch({ type: 'SET_GOALS', payload: goal }) 
    //     }
    // },[])
    // console.log(state);

    return (
        <GoalContext.Provider value={{...state, dispatch}}>
            {children}
        </GoalContext.Provider>
    )
}