const { Server } = require('socket.io');

let io = null;

function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true },
  });

  io.on('connection', (socket) => {
    console.log('Socket connecté:', socket.id);

    socket.on('join-admin', () => {
      socket.join('admin-room');
    });

    socket.on('disconnect', () => {
      console.log('Socket déconnecté:', socket.id);
    });
  });

  console.log('Socket.io: prêt');
  return io;
}

function getIO() {
  return io;
}

function emitToAdmin(event, data) {
  if (io) io.to('admin-room').emit(event, data);
}

module.exports = { initSocket, getIO, emitToAdmin };
