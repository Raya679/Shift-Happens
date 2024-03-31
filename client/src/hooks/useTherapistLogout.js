import { useAuthTherapistContext } from "./useAuthTherapistContext"


export const useLogout = () => {
    const {dispatch} = useAuthTherapistContext()
    

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('therapist')

        //dispatch logout action
        dispatch({type:'LOGOUT'})
        
    }

    return {logout}
}