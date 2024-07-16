import React from 'react';
import { useDispatch } from 'react-redux';


import closeIcon from '../../resources/images/close-icon.svg';
import '../Messenger.css';
import { removeChatboxes } from '../messengerSlice';

const ChatboxLabel = ({username}) => {
    return(
        <p className= 'chatbox_nav_bar_label'>
            {username}
        </p>
    );
};

const CloseButton = ({socketId}) => {
    
    const dispatch = useDispatch();

    const handleCloseChatBox = () => {console.log(socketId);
        dispatch(removeChatboxes(socketId));
    };


    return(
        <div className="chatbox_close_icon_container">
            <img src={closeIcon}  alt='close'  className='chatbox_close_icon_img' onClick={handleCloseChatBox}></img>
        </div>
    );
}

const NavBar = (props) => {
    return (
        <div className="chatbox_nav_bar_container">
            <ChatboxLabel username={props.username}/>
            <CloseButton socketId={props.socketId}/>
        </div>
    );
}

export default NavBar;