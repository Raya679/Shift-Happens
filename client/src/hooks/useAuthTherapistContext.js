import { AuthTherapistContext } from "../context/authTherapistContext";
import { useContext } from "react";

export const useAuthTherapistContext = () => {
    const context = useContext(AuthTherapistContext)

    if(!context){
        throw Error('useAuthContext must be used inside an ContextProvider')
    }

    return context
}