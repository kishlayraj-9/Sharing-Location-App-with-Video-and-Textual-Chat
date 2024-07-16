import {v4 as uuid} from 'uuid';
import { addChatbox, addChatMessage } from '../../Messenger/messengerSlice';
import store from '../store';
import * as socketConn from '../../socketConnection/socketConn';

export const sendChatMessage = (receiverSocketId, content) => {
    const message = {
        content,
        receiverSocketId,   
        id: uuid() ,
    }

    // socketConnection - to send the message to the other user
    socketConn.sendChatMessage(message);

    store.dispatch(addChatMessage({
        socketId: receiverSocketId,
        content: content,
        myMessage: true,
        id: message.id,
    })); 
}

export const chatMessageHandler = (messageData) => {
    store.dispatch(addChatMessage({
        socketId: messageData.senderSocketId,
        content: messageData.content,
        myMessage: false,
        id: messageData.id,
    }));

    openChatBoxIfClosed(messageData.senderSocketId);
}

const openChatBoxIfClosed = (socketId) => {
    const chatBox = store.getState().messenger.chatboxes.find((c) => c.socketId===socketId);

    const username = store.getState().map.onlineUsers.find(user => user.socketId ===socketId)?.username;
    if(!chatBox){
        store.dispatch(addChatbox({socketId,username}));
    }
}