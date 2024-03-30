import { useState } from "react";
import { useChatContext } from "../hooks/useChatRoomContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ChatForm = () => {
    const {dispatch}= useChatContext();
    const {user}=useAuthContext();

    const [writer, setWriter] = useState('')
    const [writeup, setWriteup]=useState('')
    const [error, setError] = useState(null)
    

    const handleSubmit = async (e) => {
        e.preventDefault() 

        if (!user) {
            setError('You must be logged in')
            return
          }

        const message = {writer, writeup}

        const response = await fetch('/api/chatmessages/add', {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok) 
        {
            setError(json.error)
        }

        if(response.ok)
        {
            
            setError(null)
            setWriter('')
            setWriteup('')
            dispatch({type: 'CREATE_CHATS', payload: json})
        }

    }

    return (
       
        <div className="">
        <div className="">
            <form onSubmit={handleSubmit} className="">
  
                <input
                    type="text"
                    placeholder="Your name"
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={writeup}
                    onChange={(e) => setWriteup(e.target.value)}
                />
                
                <div className='flex justify-center'>
                 <button className='btn bg-slate-300 hover:bg-slate-400 p-1.5 rounded-7'>Send</button>
                </div>
            
            {error && <div className="error">{error}</div>}
            </form>
        </div>
        </div>

    )
}

export default ChatForm