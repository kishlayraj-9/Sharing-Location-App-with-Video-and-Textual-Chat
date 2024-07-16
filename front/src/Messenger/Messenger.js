import React from 'react';
import {useSelector} from 'react-redux';
import ChatBox from './ChatBox/ChatBox';

import './Messenger.css';


// const DUMMY_CHATBOXES = [
//     {
//         username: 'Martin',
//         socketId: 1234567,
//         messages: []
//     },
//     {
//         username: 'Test',
//         socketId: 123456,
//         messages: []
//     },
    
// ]


const Messenger = () => {

    const chatboxes = useSelector((state) => state.messenger.chatboxes);

    return(
        <div className="messenger_container">
            {chatboxes.map((chatBox) => <ChatBox key={chatBox.socketId} socketId={chatBox.socketId} username={chatBox.username}/>)}
        </div>
    );
};

export default Messenger;