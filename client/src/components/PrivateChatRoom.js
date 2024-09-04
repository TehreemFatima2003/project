// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// import '../App.css';

// import { socket } from './DisplayPropertyDetails';

// import { getMessagesByRoom, updateMessageStatus } from '../api';

// const PrivateChatRoom = () => {
//   const location = useLocation();
//   const { senderId, receiverId, room, receiverName } = location.state.dataForChat;
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
  
  

// //   useEffect(() => {
// //     fetchChat();
// //   }, [room]); // Ensure room is correctly set
  

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setChat((prevChat) => [...prevChat, data]);
//     });

     
//   }, [socket]);

//   const sendMessage = async () => {
//     if (message !== "") {
//       const messageData = {
//         senderId,
//         receiverId,
//         content: message,
//         room
//       };
//       console.log("message: ", messageData)

//       // Emit the message to the server
//       socket.emit("send_message", messageData);

//       // Update the chat immediately
//       setChat((prevChat) => [...prevChat, messageData]);


//       // Clear the input field
//       setMessage("");
//     }
//   };

  
  
  

//   return (
//     <div className='chat-container'>
//       <div className='chat-head'>
//         <h3>{receiverName}</h3>
//       </div>

//       <div className='chat-body'>
        

          
//       </div>

//       <div className='chat-foot'>
//         <input
//           type='text'
//           placeholder='Type...'
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>&#9658;</button>
//       </div>
//     </div>
//   );
// };

// export default PrivateChatRoom;
