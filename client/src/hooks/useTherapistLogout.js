import { useAuthTherapistContext } from "./useAuthTherapistContext"
import { useWorkoutContext } from "./useWorkoutContext"

export const useLogout = () => {
    const {dispatch} = useAuthTherapistContext()
    const {dispatch: workoutDispatch} = useWorkoutContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('therapist')

        //dispatch logout action
        dispatch({type:'LOGOUT'})
        workoutDispatch({type:'SET_WORKOUTS', payload:null})
    }

    return {logout}
}