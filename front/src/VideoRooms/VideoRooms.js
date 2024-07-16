import React from 'react';
import {useSelector} from 'react-redux';
import CreateRoomButton from './CreateRoomButton';
import RoomJoinButton from './RoomJoinButton';
import ParticipantsVideos  from './ParticipantsVideos';

import '../MapPage/MapPage.css';

const DUMMY_ROOMS = [
    {
        id: 1,
        participants: [
            {
                socketId:1,
                peerId: 1,
                username: 'Martin',
            }
        ]
    },
    {
        id: 2,
        participants: [
            {
                socketId:2,
                peerId: 2,
                username: 'Sunny ',
            }
        ]
    }
];

const convertRoomsToArray = (videoRooms) => {
    const rooms = [];
    Object.entries(videoRooms).forEach(([key,value]) => {
        rooms.push({
            id: key, 
            creatorUsername: value.participants[0].username,
            amountOfParticipants: value.participants.length,
        });
    })

    return rooms;
}

const RoomsList = () => {
    const rooms = useSelector(state => state.videoRooms.rooms);

    //console.log(rooms);
    //console.log(useSelector(state => state.videoRooms.inRoom));
    return(
        <div className="map_page_v_rooms_list">
            <CreateRoomButton />
            {convertRoomsToArray(rooms).map(room => <RoomJoinButton 
                key={room.id}
                creatorUsername={room.creatorUsername }
                roomId={room.id}
                amountOfParticipants={room.amountOfParticipants}
            />)}
        </div>
    )
}


const VideoRooms = ()=> {
    return (
        <>
        <RoomsList />
        <ParticipantsVideos/>
        </>
    );
};

export default VideoRooms;