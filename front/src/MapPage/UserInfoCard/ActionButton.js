import React from 'react';
import ChatButton from './ChatButton';

import '../MapPage.css'

const ActionButton = (props) => {          //now only 1 button but in future we can add more button here
    return(
        <div className="map_page_card_buttons_container">
            <ChatButton {...props}/>
        </div>
    );
};

export default ActionButton;