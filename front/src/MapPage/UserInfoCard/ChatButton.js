import React from 'react';
import { useDispatch } from 'react-redux';
import chatIcon from '../../resources/images/chat-icon.svg'

import '../MapPage.css'
import { addChatbox } from '../../Messenger/messengerSlice';

const ChatButton = ({socketId, username}) => {

    const dispatch = useDispatch();

    const handleAddChatBox = () => {
        dispatch(addChatbox({
            username:username,
            socketId:socketId,
        }));
    };
    
    return(
        <img className='map_page_card_img' src = {chatIcon} onClick={handleAddChatBox} >
        </img>
    ); 
};

export default ChatButton;