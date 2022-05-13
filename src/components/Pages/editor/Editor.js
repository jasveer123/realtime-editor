import React, { useState, useEffect, useRef } from 'react'
import './Editor.css'
import logo from './4.png'
import Avatara from './Avatara'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/hint/javascript-hint'
import './Editor.css'
import ACTIONS from '../../../Actions'
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom'
import { initsocket } from '../../../socket'
import { toast, Toaster } from 'react-hot-toast'
//import Sidebar from './Sidebar'
import { slide as Menu } from 'react-burger-menu'
import Chat from './Chat'

import './Sidebar.css'

function Editor() {
  const location = useLocation()
  const socketRef = useRef(null)
  const editorRef = useRef(null)
  const codeRef = useRef(null)
  const reactnavigate = useNavigate()
  const [message, setmessage] = useState('')
  //const [incommingmsg, setincommingmsg] = useState([])

  const { RoomId } = useParams()
  const [Clients, Setclients] = useState([])
  const [msg, setmsg] = useState([])

  async function copytext() {
    try {
      await navigator.clipboard.writeText(RoomId)
      toast.success('Roomid has been copied to your clipboard')
    } catch (err) {
      toast.error('Could not copy the RoomID')
    }
  }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initsocket()
      socketRef.current.on('connection_error', (err) => handlerror())
      socketRef.current.on('connection_failed', (err) => handlerror())

      function handlerror(err) {
        console.log('connection has some error', err)
        toast.error('socket connection failed , try again later')

        reactnavigate('/')
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomid: RoomId,
        username: location.state?.Username,
      })

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.Username) {
            toast.success(`${username} joined the room.`)
            console.log(`${username} joined`)
          }
          Setclients(clients)

          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            socketId,
            code: codeRef.current,
          })
        },
      )

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`)
        Setclients((prev) => {
          return prev.filter((client) => client.socketId !== socketId)
        })
      })
    }

    init()
    return () => {
      socketRef.current.disconnect()
      socketRef.current.off(ACTIONS.JOINED)
      socketRef.current.off(ACTIONS.DISCONNECTED)
    }
  }, [])

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code)
        }
      })

      socketRef.current.on(ACTIONS.RECEIVE_MESSAGES, (data) => {
        setmsg((msg) => [...msg, data])
      })
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE)
    }
  }, [socketRef.current])

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById('textide'),
        {
          mode: { name: 'javascript', json: true },
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          hint: true,
        },
      )

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes
        const code = instance.getValue()
        codeRef.current = code
        console.log(codeRef.current)
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            RoomId,
            code,
          })
        }
      })
    }
    init()
  }, [])

  function exitfunc() {
    reactnavigate('/')
  }
  function inputchange(e) {
    setmessage(e.target.value)
  }

  function formsubmit(e) {
    e.preventDefault()
    console.log(message)

    const username = location.state.Username
    const info = {
      message,
      RoomId,
      username,
    }
    socketRef.current.emit(ACTIONS.SEND_MESSAGES, { info })
    setmsg((msg) => [...msg, info])
    //setincommingmsg((incommingmsg) => [...incommingmsg, message])
    setmessage('')
  }

  if (!location.state) {
    return <Navigate to="/" />
  }

  return (
    <div className="divwrapper2">
      <div className="aside">
        <div className="div1">
          <Toaster position="top-right" reverseOrder={false} />

          <div className="logo-div">
            <img src={logo} alt="image is loading" className="logo-editor" />
          </div>
          <div className="conn">Connected</div>
          <div className="Avatar">
            {Clients.map((client) => {
              return (
                <Avatara username={client.username} key={client.socketId} />
              )
            })}
          </div>
        </div>
        <div className="asideinner">
          <button id="copy-btn" className="btn-editor" onClick={copytext}>
            Copy Room ID
          </button>
          <br />
          <br />
          <button id="leave-btn" className="btn-editor" onClick={exitfunc}>
            Leave
          </button>
        </div>
      </div>

      <div className="right-editor" wrap="off">
        <textarea id="textide"></textarea>
      </div>
      <div className="end">
        <Menu right>
          <div className="wrap-sidebar">
            <div className="uppar">
              <Chat in={msg} username={location.state.Username} />
            </div>
            <div className="lower">
              <form onSubmit={formsubmit}>
                <input
                  className="inputlow"
                  type="text"
                  onChange={inputchange}
                  value={message}
                  placeholder="type message..."
                ></input>
                <span>
                  <button type="Submit" className="btn-side">
                    Send
                  </button>
                </span>
              </form>
            </div>
          </div>
        </Menu>
      </div>
    </div>
  )
}

export default Editor
