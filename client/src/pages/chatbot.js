// import React from 'react'
// import 'semantic-ui-react';

// // import ChatBot from 'react-simple-chatbot'
// import { Segment } from 'semantic-ui-react'

// import { useState } from 'react';
// import { useEffect } from 'react';

// import { ThemeProvider } from 'styled-components';
// // import backgroundImage from './pages/bg2.jpg'
// // import BackgroundImage from './pages/bg5.jpg';
// // import './background.css';

// const theme = {
//   background: '#f5f8fb',
//   fontFamily: 'sans-serif',
//   headerBgColor: '#6c4f0f',
//   headerFontColor: '#fff',
//   headerFontSize: '20px',
//   botBubbleColor: 'white',
//   botFontColor: 'black',
//   userBubbleColor: '#fff',
//   userFontColor: '#4a4a4a',
  
// };

// const FetchAnswer = ({ steps, triggerNextStep }) => {
//   const [answer, setAnswer] = useState('');
//   const [error, setError] = useState(null);
//   console.log(steps);
//   const fetchAnswerFromModel = async (question) => {
//     try {
//       console.log('Fetching answer for query:', question);

//       const formData = new FormData();
//       formData.append('question', question);

//       const response = await fetch(`http://127.0.0.1:5000/answer_to/`, {
//         method: 'POST',
//         body: formData,
//       });
//       console.log('Response:', response);

//       const data = await response.json();
//       console.log('Data:', data);

//       if (response.ok) {
//         console.log('data')
//         setAnswer(data.answer);
//         setError(null);
//         triggerNextStep({ trigger: "waiting2" });
//       } else {
//         setError(data.answer || 'An error occurred.');
//       }
//     } catch (error) {
//       console.error('Error fetching answer:', error);
//       setError('An error occurred while fetching the answer.');
//     }
//   };

//   useEffect(() => {    
//     let userQuery = '';
//     userQuery = steps.waiting2.value;
//     if (userQuery) {
//       fetchAnswerFromModel(userQuery);
//     } else {
//       setError('No question provided.');
//     }
//   }, []);

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return <p style={{ color: 'black' }}>{answer.answer}</p>;
// };

// const steps = [
//   {
//     id: 'AskQuery',
//     message: 'Hello, how can I help you?',
//     trigger: 'waiting2',
//   },
//   {
//     id: 'waiting2',
//     user: true,
//     trigger: 'FetchAnswer',
//   },
//   {
//     id: 'FetchAnswer',
//     style: { botFontColor: '#fff' },
//     component: <FetchAnswer />,
//     asMessage: true,
//   },
  
// ];

// const chatBotStyle = {
// //   backgroundImage: `url(${BackgroundImage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   bbackgroundRepeat: 'no-repeat',
//   width:'70vw',
//   height:'auto',
// };
// function ChatBotPage() {

//     useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       window.location.href = "/login";
//     }
//   });

//   return (
//     <div className=''>
//       <div className='chat-wrapper flex items-center justify-center mt-28' >
//         <ThemeProvider theme={theme} >
//           <ChatBot steps={steps} style={chatBotStyle} botAvatar="bot4.jpg" />

//         </ThemeProvider>
//       </div>
//     </div>
//   )
// }

// export default ChatBotPage