import { createContext , useEffect, useReducer} from "react";

export const AuthTherapistContext = createContext()

export const authTherapistReducer = (state,action) =>{
    switch(action.type){
        case 'LOGIN':
            return {therapist : action.payload}
        case 'LOGOUT':
            return {therapist : null}
        default :
            return state
    }
}

export const AuthTherapistContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(authTherapistReducer, {
        therapist:null
    })

    useEffect(() => {
        const therapist=JSON.parse(localStorage.getItem('therapist'))

        if(therapist){
            dispatch({type: 'LOGIN', payload:therapist})
        }
    }, [])

    console.log('Authcontext state : ',state)


    return (
        <AuthTherapistContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthTherapistContext.Provider>
    )
}