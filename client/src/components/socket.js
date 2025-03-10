// socket.js
import { io } from "socket.io-client";

// const socket = io("http://localhost:5001", { autoConnect: true });
const socket = io("https://ems-n0yt.onrender.com", { autoConnect: true });

export default socket;
