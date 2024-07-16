import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    chatboxes: [],
    chatHistory: {},
};

export const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        addChatbox: (state, action) => {
            if(!state.chatboxes.find((chatbox) => chatbox.socketId === action.payload.socketId)){
                state.chatboxes.push(action.payload);
            };
        },
        removeChatboxes: (state, action) => {
            state.chatboxes = state.chatboxes.filter((chatbox) => chatbox.socketId !== action.payload);
        },
        addChatMessage: (state, action) => {
            if(state.chatHistory[action.payload.socketId]) {
                //if already exists with messages with that user - append the message
                state.chatHistory[action.payload.socketId].push({
                    content:action.payload.content,
                    myMessage: action.payload.myMessage,
                    id: action.payload.id,
                });
            }
            else{
                state.chatHistory[action.payload.socketId] = [{
                    content:action.payload.content,
                    myMessage: action.payload.myMessage,
                    id: action.payload.id,
                }];
            }
        },

    },
});

export const {addChatbox, removeChatboxes, addChatMessage} = messengerSlice.actions;

export default messengerSlice.reducer;