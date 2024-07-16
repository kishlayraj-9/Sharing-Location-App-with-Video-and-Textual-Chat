import {v4 as uuid} from 'uuid';
import store from '../store';
import { setInRoom , setRooms} from '../../realtimeCommunication/videoRoomsSlice';
import * as socketConn from '../../socketConnection/socketConn'
import { getAcessToLocalStream } from '../../realtimeCommunication/webRTCHandler';

export const createVideoRoom = async () => {
    //get access to a local stream
    const success = getAcessToLocalStream();

    if(success){
        const newRoomId = uuid();

        store.dispatch(setInRoom(newRoomId));

        socketConn.createVideoRoom({
            peerId: 1, //change later on for real peerID
            newRoomId,
        })
    }
};

export const videoRoomsListHandler = (videoRooms) => {
    store.dispatch(setRooms(videoRooms));
}

