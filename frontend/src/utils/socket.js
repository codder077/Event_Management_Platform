import { io } from 'socket.io-client';
const socket = io(`${process.env.REACT_APP_SOCKET_SERVER_URL}`, {
  transports: ["websocket"],
});


socket.on('connect', () => {
  console.log('Socket connected');
});

export default socket;
