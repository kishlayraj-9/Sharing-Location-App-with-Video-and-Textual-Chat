import React from 'react';

const LoginInput  = ({ username,setUserName}) => {
    const handleValueChange = (e) =>{
        setUserName(e.target.value);
    }
    return (
        <input className='l_page_input' value={username} onChange={handleValueChange}></input>
    );
};

export default LoginInput;