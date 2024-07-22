import React from 'react';
import callIcon from '../resources/images/call-icon.svg';

import '../MapPage/MapPage.css';
import { createVideoRoom } from '../store/actions/videoRoomActions';
import { useSelector } from 'react-redux';

const CreateRoomButton = () => {
    const inRoom  = useSelector((state) => state.videoRooms.inRoom);

    const handleRoomCreate = () =>{
        if(inRoom){
            return alert('You are already in room');
        }
        
        createVideoRoom();
    }

    return(
        <img src={callIcon} className="map_page_card_img" onClick={handleRoomCreate}/>
    ); 
};

export default CreateRoomButton;