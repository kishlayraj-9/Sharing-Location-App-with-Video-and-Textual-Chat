import {v4 as uuid} from 'uuid';
import store from '../store';
import { setInRoom , setRooms} from '../../realtimeCommunication/videoRoomsSlice';
import * as socketConn from '../../socketConnection/socketConn'
import { getAcessToLocalStream, getPeerId, disconnect } from '../../realtimeCommunication/webRTCHandler';

export const createVideoRoom = async () => {
    //get access to a local stream
    const success = await getAcessToLocalStream();
    // console.log("Looking....");
    // console.log(success);
    if(success){
        const newRoomId = uuid();

        store.dispatch(setInRoom(newRoomId));

        socketConn.createVideoRoom({
            peerId: getPeerId(), //change later on for real peerID
            newRoomId,
        });
    };
};

export const joinVideoRoom = async (roomId) =>{
    const success =  await getAcessToLocalStream();    //importance of await
    // console.log("Looking....");
    // console.log(success);            //if you print it without await you will find that success is not completed
    if(success){
        store.dispatch(setInRoom(roomId));
        socketConn.joinVideoRoom({
            roomId,
            peerId: getPeerId(), 
        });
    }
};

export const videoRoomsListHandler = (videoRooms) => {
    store.dispatch(setRooms(videoRooms));
}

export const leaveVideoRoom = (roomId) => {
    disconnect ();
    socketConn.leaveVideoRoom({
        roomId,
    });

    store.dispatch(setInRoom(false));
}

