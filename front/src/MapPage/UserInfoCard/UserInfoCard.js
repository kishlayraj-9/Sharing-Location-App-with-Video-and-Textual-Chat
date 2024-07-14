import React from 'react';
import { useSelector } from 'react-redux';

import { calculateDistanceBetweenCoords } from '../../utils/location';
import ChatButton from './ChatButton';

import '../MapPage.css';

const Label = ({fontSize, text}) =>{
    return(
        <p className='="map_page_card_label' style={{fontSize}}>
            {`${text}km`}
        </p>
    );
};

const UserInfoCard = ({username, userLocation, socketId}) => {
    
    const myLocation =useSelector((state) => state.map.myLocation);
    
    return (
        <div className="map_page_card_container">
            <ChatButton/>
            <Label text = {username} fonstSize = '16px' />
            <Label text = {calculateDistanceBetweenCoords(myLocation, userLocation)} fonstSize = '14px'/>
        </div>
    );
};

export default UserInfoCard; 