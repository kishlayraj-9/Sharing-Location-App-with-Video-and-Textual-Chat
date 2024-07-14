import React from 'react';
import chatIcon from '../../resources/images/chat-icon.svg'

const ChatButton = ({socketId, username}) => {

    // const handleAddChatBox = (e) = {
    //     re
    // };
    //onClick={handleAddChatBox}

    return(
        <img className='map_page_card_img' src = {chatIcon} >
        </img>
    ); 
};

export default ChatButton;