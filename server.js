import http from 'http';
import app from './app.js';
import { initializeSocket } from './socket.js';

const server = http.createServer(app);
initializeSocket(server);

const port = process.env.PORT || 5000;

 server.listen(port, "0.0.0.0", (req, res) => {
  console.log(`Server is running on the port: ${port}`);
});

