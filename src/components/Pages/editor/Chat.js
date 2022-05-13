import React from 'react'
import './chat.css'

function Chat(props) {
  return (
    <>
      {props.in.map((payload, index) => {
        return (
          <div
            className="talk-bubble tri-right left-top"
            key={index}
            id={props.username === payload.username ? 'you' : 'other'}
          >
            <div className="talktext">
              <p>{payload.message}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Chat
