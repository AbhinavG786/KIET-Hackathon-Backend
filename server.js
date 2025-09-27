import app from './app.js';
import http from 'http';
import { SocketServiceInit } from './utils/socket-server.js';

const PORT = process.env.PORT || 5000;

const server=http.createServer(app)

SocketServiceInit(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});