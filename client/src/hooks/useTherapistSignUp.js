import { useState } from "react";
import {useAuthTherapistContext} from './useAuthTherapistContext'

export const useTherapistSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthTherapistContext()

    const signup = async (name,email,specialization,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch ('/api/therapist/signup',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name,email,specialization,password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save the user to local storage
            localStorage.setItem('therapist', JSON.stringify(json))

            //update auth context
            dispatch({type:'LOGIN', payload:json})

            setIsLoading(false)
        }
    }

    return {signup,isLoading,error}
}