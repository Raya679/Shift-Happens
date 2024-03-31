// import React, { useState, useEffect, useContext } from 'react';
// import { useAuthContext } from '../hooks/useAuthContext';

// const ChatRoom = () => {
//     const { user } = useAuthContext();
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         // Fetch messages logic here
//     }, []);

//     const sendMessage = async () => {
//         if (!user) {
//             // Handle not logged in user
//             console.log('User is not logged in.');
//             return;
//         }

//         // Send message logic here
//     };

//     return (
//         <div>
//             <h2>Chat Room</h2>
//             {/* Chat messages rendering */}
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Type your message..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button onClick={sendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default ChatRoom;










// import React, { useState, useEffect } from 'react';
// import { useAuthContext } from '../hooks/useAuthContext';
// import SideBar from "../components/sideBar.js";

// const ChatRoom = () => {
//     const [messages, setMessages] = useState([]);
//     const [users, setUsers] = useState('');
//     const [message, setMessage] = useState('');
//     const {user} = useAuthContext();

//     const fetchMessages = async () => {
//         try {
//             const response = await fetch('/api/chatmessages/get', {
//                 headers: {'Authorization': `Bearer ${user.token}`},
//             });
//             const data = await response.json();
//             setMessages(data);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };
 
//     const sendMessage = async () => {
//         try {
//             await fetch('/api/chatmessages/add', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${user.token}`
//                 },
//                 body: JSON.stringify({ users, message }),
//             });
 
//             // Clear the message input after sending
//             setMessage('');
//             // Fetch messages to update the list
//             fetchMessages();
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };
 
//     useEffect(() => {
//         // Fetch messages on component mount
//         fetchMessages();
//         // Poll for new messages every 2 seconds
//         const interval = setInterval(() => {
//             fetchMessages();
//         }, 2000);
 
//         return () => clearInterval(interval);
//     }, []); // Run only once on mount
 
//     return (
//         <div >
//             {user && (
//                 <div className="chatroom">
//                     <div>
//                     <SideBar/>
//                     </div>
//                     <div>
//             <h2>Chat Room</h2>
            
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Your name"
//                     value={users}
//                     onChange={(e) => setUsers(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Type your message..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button onClick={sendMessage}>Send</button>
//             </div>

//             <ul>
//                 {messages.map((message) => (
//                     <li key={message._id}>
//                         <strong>{message.users}:</strong> {message.message}
//                     </li>
//                 ))}
//             </ul>
//             </div>
//             </div>
//             )}
//         </div>
//     );
// };
 
// export default ChatRoom;

import { useEffect } from "react";
import { useChatContext } from "../hooks/useChatRoomContext";
import ChatDetails from "../components/chatRoomDetails";
import ChatForm from "../components/chatRoomForm";
import { useAuthContext } from "../hooks/useAuthContext";
// import { Link } from "react-router-dom";
import SideBar from "../components/sideBar";

document.body.style = 'background: white';
const Messages = () => {
    const { chats, dispatch } = useChatContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchChats = async () => {
            const response = await fetch('/api/chatmessages/get', {
                headers: {'Authorization': `Bearer ${user.token}`},
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_CHATS', payload: json });
            }
        }

        if(user){
        fetchChats()
        }
    }, [dispatch, user]);

    return (

        <div className="fetchchats">           
            
                <SideBar />

            <div className="form-chat">
                <h3>Chat Room</h3>
                <div className="chatform">                    
                    <ChatForm />
                </div>


                <div className="chats-container">
                    
                    {chats && chats.map(message => (
                        <ChatDetails message={message} key={message._id} />
                    ))}
                </div>
            </div>
        </div>


    );
};

export default Messages;
