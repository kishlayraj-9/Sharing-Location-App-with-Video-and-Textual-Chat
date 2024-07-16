import React, {useRef, useEffect} from 'react';

const Video = ({stream, muted}) => {
    const videoE1 = useRef();

    useEffect(()=>{
        const video = videoE1.current;
        video.srcObject=stream;

        video.onloadedmetadata = () =>{
            video.play();
        };
    },[stream]);
    return(
        <div className="map_page_v_rooms_video_container">
            <video 
                ref={videoE1}
                width = '98%'
                height = '98%'
                playsInline
                autoPlay
                muted={muted}
            ></video>
        </div>
    );
};

export default Video;