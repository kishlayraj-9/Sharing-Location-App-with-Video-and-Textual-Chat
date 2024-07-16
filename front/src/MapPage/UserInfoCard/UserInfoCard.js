import React from 'react';
import { useSelector } from 'react-redux';

import { calculateDistanceBetweenCoords } from '../../utils/location';
import ActionButton from './ActionButton';

import '../MapPage.css';


const Label = ({fontSize, text}) =>{
    return(
        <p className='="map_page_card_label' style={{fontSize}}>
            {text}
        </p>
    );
};

const UserInfoCard = ({username, userLocation, socketId}) => {
    
    const myLocation =useSelector((state) => state.map.myLocation);
    
    return (
        <div className="map_page_card_container">
            <Label text = {username} fonstSize = '16px' />
            <Label text = {`${calculateDistanceBetweenCoords(myLocation, userLocation)}km`} fonstSize = '14px'/>
            <ActionButton socketId = {socketId} username ={username}/>
        </div>
    );  
};

export default UserInfoCard; 