import { Server } from 'socket.io';
import userModel from './models/userModel.js';

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: 'https://ridesync1.netlify.app',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client Connected: ${socket.id}`);

    socket.on('join', async (data) => {
      const { userId } = data;
      await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
    });

    socket.on('disconnect', (reason) => {
      console.log(`Client Disconnected: ${socket.id}, Reason: ${reason}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log('Socket.io is not initialized');
  }
};

export {
  initializeSocket,
  sendMessageToSocketId
};