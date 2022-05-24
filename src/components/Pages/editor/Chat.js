import React from 'react'
import './chat.css'
import Avatar from 'react-avatar'
import { BsChatDots } from 'react-icons/bs'

function Chat(props) {
  return (
    <>
      <div className="heading">
        Live chat
        <BsChatDots className="bs" />
      </div>
      {props.in.map((payload, index) => {
        return (
          <div
            className="wrapperdivid"
            id={
              props.username === payload.username
                ? 'wrapperyou'
                : 'wrapperother'
            }
          >
            <div
              className="talk-bubble tri-right left-top"
              key={index}
              id={props.username === payload.username ? 'you' : 'other'}
            >
              <div className="talktext">
                <p>{payload.message}</p>
              </div>
            </div>
            <div
              id={props.username === payload.username ? 'youdiv' : 'otherdiv'}
            >
              <Avatar name={payload.username} size="40px" round="25px" />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Chat
