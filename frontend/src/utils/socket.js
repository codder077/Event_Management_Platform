import { io } from 'socket.io-client';
const SOCKET_SERVER_URL = "http://localhost:5000"; 
const socket = io(`${SOCKET_SERVER_URL}`, {
    transports: ["websocket"],
});

socket.on('connect', () => {
  console.log('Socket connected');
});

export default socket;
