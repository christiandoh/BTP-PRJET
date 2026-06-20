import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
  autoConnect: false,
  transports: ['websocket', 'polling'],
})

export function connectAdmin(token) {
  if (socket.connected) return
  socket.auth = { token }
  socket.connect()
  socket.emit('join-admin')
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect()
  }
}

export function onNewMessage(callback) {
  socket.on('new-message', callback)
  return () => socket.off('new-message', callback)
}

export default socket
