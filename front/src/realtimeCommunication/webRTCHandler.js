import { setLocalStream, setRemoteStream } from "./videoRoomsSlice";
import store from "../store/store";
import {Peer} from 'peerjs';

let peer;
let peerId;

export const getPeerId = () => {
    return peerId;
}

export const getAcessToLocalStream = async() => {
    const localStream = await navigator.mediaDevices.getUserMedia({ //using computer microphone and camera
        video: true,
        audio: true,
    });

    if(localStream){
        //console.log(localStream);
        store.dispatch(setLocalStream(localStream));
    }
    // console.log("Looking.....");
    // console.log(localStream);
    
    return Boolean(localStream);
};

export const connectWithPeerServer = () => {
    peer = new Peer(undefined, {
      host: "localhost",
      port: 9000,
      path: "/peer",
    });
  
    peer.on("open", (id) => {
      console.log("My peer ID is:" + id);
      peerId = id;
    });
  
    peer.on("call", async (call) => {
      const localStream = store.getState().videoRooms.localStream;
  
      call.answer(localStream); // Answer the call with A/V stream
      //console.log(localStream);
  
      call.on("stream", (remoteStream) => {
        console.log("remote stream came");
        //console.log(remoteStream);
        store.dispatch(setRemoteStream(remoteStream));
      });
    });
};


export const call = (data) => {       // call caller side
    const { newParticipantPeerId } = data;
  
    const localStream = store.getState().videoRooms.localStream;
  
    console.log("Attempting to call peer with ID:", newParticipantPeerId, localStream);
    const peerCall = peer.call(newParticipantPeerId, localStream);
  
    peerCall.on("stream", (remoteStream) => {
      console.log("Remote stream received:", remoteStream);
      store.dispatch(setRemoteStream(remoteStream));
    });
};

export const disconnect = () => {
  console.log("getting disconnect");
  for(let conns in peer.connections){console.log(conns);
    peer.connections[conns].forEach((c) => {
      console.log('closing connections');
      c.peerConnection.close();

      if(c.close){
        c.close();
      }
    })
  }

  store.dispatch(setRemoteStream(null));
}