import React from 'react';

const LoginButton = (props) => {
    return(
        <button className= 'l_page_login_button' disabled= {props.disabled} onClick = {props.onClickHandler} >Login</button>
    );
};

export default LoginButton; 