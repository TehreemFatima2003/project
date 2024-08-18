import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
    
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    room: { type: String, required: true },
    read: { type: Boolean, default: false},
    time: { type: Date, default: Date.now }
});

const ChatModel = mongoose.model('ChatModel', chatSchema);

export default ChatModel;
