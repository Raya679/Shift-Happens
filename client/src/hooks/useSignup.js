import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// export const useSignup = () => {
//     const[error, setError] = useState(null)
//     const [isLoading, setIsLoading] = useState(null)
//     const {dispatch} = useAuthContext()

//     const signup = async(email, username, password) => {
//         setIsLoading(true)
//         setError(null)
//         // console.log(email, username, password)
//         const response = await fetch('/api/user/signup',{
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({email, username , password})
//         })

//         const json = await response.json()

//         if(!response.ok)
//         {
//             setIsLoading(false)
//             setError(json.error)
//         }

//         if(response.ok)
//         {
//             //save user to local storage
//             localStorage.setItem('user', JSON.stringify(json))

//             //update the auth context
//             dispatch({type:'LOGIN', payload:json})

//             setIsLoading(false)
//         }
//     }

//     return {signup, isLoading, error}
// }

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, username, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });

            console.log('Response Status:', response.status);

            const json = await response.json();
            console.log('Response JSON:', json);

            if (!response.ok) {
                throw new Error(json.error || 'Sign up failed');
            }

            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json });

        } catch (error) {
            console.error('Error during signup:', error);
            setError(error.message || 'Sign up failed');
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
