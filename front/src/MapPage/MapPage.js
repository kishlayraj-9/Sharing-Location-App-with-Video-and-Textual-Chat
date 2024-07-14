import React, {useState}from 'react';
import GoogleMapReact from 'google-map-react';
import {useSelector} from 'react-redux';
import Marker from './Marker';

import UserInfoCard from './UserInfoCard/UserInfoCard';


import './MapPage.css';

const MapPage = () => {

    const myLocation = useSelector((state) => state.map.myLocation);
    const onlineUsers = useSelector((state) => state.map.onlineUsers);
    const cardChosenOption = useSelector((state) => state.map.cardChosenOption);

    console.log(onlineUsers);

    const defaultMapProps = {
        center: {
            lat: myLocation.lat,
            lng: myLocation.lng
        },
        zomm: 11,
    };

    return(
        <div className="map_page_container">
            <GoogleMapReact 
            bootstrapURLKeys={{key: ''}} 
            defaultCenter={defaultMapProps.center}
            defaultZoom={defaultMapProps.zomm}
            >
                {onlineUsers.map((user) => {
                    return(
                        <Marker 
                        lat ={user.coords.lat}
                        lng ={user.coords.lng}
                        key={user.socketId}
                        myself = {user.myself}
                        socketId = {user.socketId}
                        username={user.username}
                        coords = {user.coords}
                        />
                    );
                })}
            </GoogleMapReact>
            {cardChosenOption && <UserInfoCard
                socketId={cardChosenOption.socketId}
                username={cardChosenOption.username}
                userLocation={cardChosenOption.coords}
            />}
        </div>
    );
};



export default MapPage;
