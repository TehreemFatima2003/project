// import ChatModel from '../Model/ChatModel.js'

// export const createMessage = async (req, res) => {
//     try {
      
//       const { senderId, receiverId,   content, room } = req.body;
//       console.log(req.body)
      
     
//       const storeChat = await ChatModel.create({ senderId, receiverId,   content, room });
    
  
//       if (!storeChat) {
//         return res.status(400).json("Error saving chat message");
//       }

//       console.log("message created : ", storeChat)
  
      
//       res.status(200).json(storeChat);
     
//     } 
//     catch (error) {

      
//       return res.status(404).json({ error: error.message });
//     }
//   };

//   export const getMessagesByRoom = async (req, res) => {
//     try {
//       const { room } = req.query; // Use req.query for query parameters
//       const chat = await ChatModel.find({ room });
  
//       if (!chat) return res.status(400).json("No chat record");

  
//       return res.status(200).json(chat);
//     } catch (error) {
     
//       res.status(404).json(error.message);
//     };
//   }
//   export const getUnreadMessages = async (req, res) => {
//     try {
//       const { receiverId } = req.params;
      
  
//       const unreadMessages = await ChatModel.find({ receiverId: receiverId, read: false });

  
//       if (!unreadMessages || unreadMessages.length === 0) {
//         return res.status(200).json("No unread messages");
//       }
//       return res.status(200).json(unreadMessages);
//     } 
//     catch (error) {
//       return res.status(404).json({ error: error.message });
//     }
//   };
   
//   export const updateMessageStatus = async (req, res) => {
//     try {
//       console.log("hello from status update");
//       const { messageId } = req.params;
//       const updatedMessage = await ChatModel.findByIdAndUpdate(
//         { _id: messageId} ,
//         { read: true },
//         { new: true }
//       );
  
//       if (!updatedMessage) {
//         return res.status(404).json({ message: "Message not found" });
//       }
  
//       console.log("Status updated successfully");
//       res.status(200).json({ message: "Status updated", updatedMessage });
//     } catch (error) {
//       console.error("Error updating message status:", error);
//       return res.status(500).json({ error: error.message });
//     }
//   };
  
  
//  export const getRecentMessageFromChat= async(req, res)=>
//  {
//      try{
//       console.log("called")
//       const {room }= req.params;
//       const recentMessage = await ChatModel.findOne({ room: room })
//     .sort({ time: -1 }) // Sort by timestamp in descending order

//   if (!recentMessage) {
//     return res.status(404).json({ message: "No messages found" });
//   }
//   console.log(recentMessage);
//   res.status(200).json(recentMessage)

// }

//      catch(error){

//        console.log("cant fetch recent message");
//       return res.status(404).json({ error: error.message });
//     }
//  }