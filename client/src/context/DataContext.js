import { createContext, useReducer, useEffect } from "react";

export const DataContext = createContext();

export const dataReducer = (state, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return {data: action.payload}
        case 'CREATE_DATA':
            return {data: action.payload, ...state.data}
        case 'CLEAR':
            return {data: null}
        default:
            return state
    }
}

export const DataContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(dataReducer, {
        data:null
    })

useEffect (()=>{
    const data = JSON.parse(localStorage.getItem('data'))

    if(data)
    {
        dispatch({ type: 'GET_DATA', payload: data }) 
    }
},[])
console.log(state);

    return (
        <DataContext.Provider value = {{...state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}

