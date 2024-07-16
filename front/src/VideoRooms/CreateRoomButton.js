import React from 'react';
import callIcon from '../resources/images/call-icon.svg';

import '../MapPage/MapPage.css';
import { createVideoRoom } from '../store/actions/videoRoomActions';

const CreateRoomButton = () => {

    const handleRoomCreate = () =>{
        createVideoRoom();
    }

    return(
        <img src={callIcon} className="map_page_card_img" onClick={handleRoomCreate}/>
    ); 
};

export default CreateRoomButton;