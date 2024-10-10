const cloud = require('wx-server-sdk');
const socketIo = require('socket.io');

cloud.init();

exports.main = async (event, context) => {
  const io = socketIo();

  io.on('connection', (socket) => {
    console.log('A user connected.');
    socket.on('message', (msg) => {
      console.log('Received message:', msg);
      io.emit('message', `Server received: ${msg}`);
    });
  });

  return {
    success: true,
  };
};