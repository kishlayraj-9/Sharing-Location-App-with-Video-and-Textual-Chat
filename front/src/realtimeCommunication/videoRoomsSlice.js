import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    inRoom: null,   //if user will be in room - here we be saving room id
    rooms: [],
    localStream: null,         //local media stream object
    remoteStream: null,
    isMicOn: true,
    isCameraOn: true,
}

export const videoRoomsSlice = createSlice({
    name: 'videoRooms',
    initialState: intialState,
    reducers: {
        setInRoom: (state,action) => {
            state.inRoom = action.payload;
        },
        setRooms: (state,action) => {
            state.rooms = action.payload; 
        },
        setLocalStream: (state,action) => {
            state.localStream = action.payload;
        },
        setRemoteStream: (state, action) => {
            state.remoteStream = action.payload;
        },
        setIsMicOn:(state, action) => {
            state.isMicOn = action.payload;
        },
        setIsCameraOn:(state, action) => {
            state.isCameraOn = action.payload;
        },
    },
});

export const {setInRoom, setRooms, setLocalStream, setRemoteStream, setIsCameraOn,setIsMicOn} = videoRoomsSlice.actions;

export default videoRoomsSlice.reducer;