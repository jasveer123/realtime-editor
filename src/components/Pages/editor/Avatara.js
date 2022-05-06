import React from 'react'
import Avatar from 'react-avatar';
const Avatara = (props) => {

    return (
        <div className='Avatarcon'>
            <Avatar name={props.username} size="50px" round="25px" />
            <span style={{ fontSize: "13px" }} > {props.username}</span>
        </div >
    )
}

export default Avatara