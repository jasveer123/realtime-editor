const express = require('express')
const app = express()
const http = require('http')
const path = require('path')

const env = require('dotenv')

const { Server } = require('socket.io')
const ACTIONS = require('./src/Actions')
const server = http.createServer(app)
const io = new Server(server)

const socketMap = {}
app.use(express.static('build'))
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: socketMap[socketId],
      }
    },
  )
}

io.on('connection', (socket) => {
  console.log('connection is done---------> ', socket.id)

  socket.on(ACTIONS.JOIN, ({ roomid, username }) => {
    socketMap[socket.id] = username
    socket.join(roomid)
    const clients = getAllConnectedClients(roomid)
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      })
    })
  })

  socket.on(ACTIONS.SEND_MESSAGES, ({ info }) => {
    console.log('info', info)
    socket.in(info.RoomId).emit(ACTIONS.RECEIVE_MESSAGES, info)
  })

  socket.on(ACTIONS.CODE_CHANGE, ({ RoomId, code }) => {
    socket.in(RoomId).emit(ACTIONS.CODE_CHANGE, { code })
  })

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    console.log('this is what we require', socketId, code)
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code })
  })

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms]
    console.log(socket.rooms)
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: socketMap[socket.id],
      })
    })
    console.log(socketMap[socket.id])
    delete socketMap[socket.id]
    socket.leave()
  })
})
const PORT = 9000
server.listen(PORT, () => {
  console.log(`listen to theport number : ${PORT}`)
})
