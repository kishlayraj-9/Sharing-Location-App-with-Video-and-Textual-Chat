import { setLocalStream } from "./videoRoomsSlice";
import store from "../store/store";

export const getAcessToLocalStream = async() => {
    const localStream = await navigator.mediaDevices.getUserMedia({ //using computer microphone and camera
        video: true,
        audio: true,
    });

    if(localStream){
        console.log(localStream);
        store.dispatch(setLocalStream(localStream));
    }

    return Boolean(localStream);
};