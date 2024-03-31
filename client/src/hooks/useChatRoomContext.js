import { ChatContext } from "../context/chatRoomContext";
import { useContext } from "react";

export const useChatContext = () => {
    const context = useContext(ChatContext)

    if(!context)
    {
        throw Error('useChatContext must be inside a ChatContextProvider')
    }

    return context
}