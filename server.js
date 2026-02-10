import http from 'http';
import app from './app.js';
import { initializeSocket } from './socket.js';

const server = http.createServer(app);
initializeSocket(server);

const port = process.env.PORT || 5000;

server.listen(port, (req, res) => {
    console.log(`Server is running on PORT ${port}`);
   
});

