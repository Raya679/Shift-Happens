import { useChatContext } from "../hooks/useChatRoomContext";
import { useAuthContext } from "../hooks/useAuthContext";
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ChatDetails = ({message}) => {
    const {dispatch} = useChatContext()
    const {user} = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return
          }
    };
    

    return (
        <div>
            {user && (
        <div className="">
        <div className="">
     
            <p> {message.writer} : {message.writeup}</p>
            
        </div>
        </div>
        )}
        </div>
    )
}

export default ChatDetails