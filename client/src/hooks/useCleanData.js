import { useDataContext } from "./useDataContext";

export const useCleanData = () => {
    const {dispatch} = useDataContext();

    const cleanData = () => {
        localStorage.removeItem('data');
        dispatch({type: 'CLEAR'})
    }

    return {cleanData}
}