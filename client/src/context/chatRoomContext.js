import { createContext, useReducer} from "react";

export const ChatContext = createContext()

export const ChatReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHATS':
            return {
                chats: action.payload
            };
        case 'CREATE_CHATS':
            return {
                chats: [action.payload, ...state.chats] // Fix: state.goals instead of state.goal
            };
        default:
            return state;
    }
};


export const ChatContextProvider = ({ children}) => {
    const [state, dispatch] = useReducer(ChatReducer, {
        chats: null
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
        <ChatContext.Provider value={{...state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}