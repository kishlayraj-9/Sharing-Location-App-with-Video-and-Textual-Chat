import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {setMyLocation} from '../MapPage/mapSlice';


import Logo from './Logo';
import LoginButton from './LoginButton';
import LoginInput from './LoginInput';

import './LoginPage.css'
import {getFakeLocation} from './FAKE_LOCATION';
import { connectWithSocketIOServer } from '../socketConnection/socketConn';
import { proceedWithLogin } from '../store/actions/loginPageAction';
import { connectWithPeerServer } from '../realtimeCommunication/webRTCHandler';

const isUsernameValid = (username) => {
    if(username.length > 3 && username.length <10 && !username.includes(' ')){
        return true;
    }
    return false;
}


const LoginPage = () => {

    const [username, setUserName] = useState('');
    const [locationErrorOccurred, setLocationErrorOccured] = useState(false);

    const myLocation = useSelector(state => state.map.myLocation);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () =>{
        //if(isUsernameValid(username)){
            proceedWithLogin({
                username: username,
                coords: {
                    lng: myLocation.lng,
                    lat: myLocation.lat,
                }
            })
            navigate('/map');
        //}
    };

    const onSuccess = (position) =>{
        console.log(position);
        dispatch(setMyLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        }));
    };

    const onError = (error) =>{
        console.log('Error occured when trying to grt location')
        console.log(error);
        setLocationErrorOccured(true);
    };

    const locationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    useEffect(() => {
        //navigator.geolocation.getCurrentPosition(onSuccess, onError, locationOptions);
        onSuccess(getFakeLocation());
    }, []);             //only one time useEffect execute intially when component renders 

    useEffect(() =>{         //Here we don't use a useEffect with the if condition, then every time state changes for any variable conditions runs and nake new connection, so by used state it only runs when location changes.
        if(myLocation){
            connectWithSocketIOServer();
            connectWithPeerServer();
        }
    }, [
        myLocation        //once the dependency changes then useEffect will execute
    ])
    return(
        
        <div className='l_page_main_container'>
            {/*JSON.stringify(username)*/}
            <div className="l_page_box">
                <Logo />
                <LoginInput username={username} setUserName={setUserName} />
                <LoginButton disabled = {!isUsernameValid(username) || locationErrorOccurred} onClickHandler={handleLogin}/>
            </div>
        </div>
    );
};

export default LoginPage;
