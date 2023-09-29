const { log } = require('console');

const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);
    this.paths = {};

    this.middlewares();

    this.socketIOConfig();
  }

  middlewares() {
    this.app.use(cors());

    // this.app.use((req, res, next) => {
    //   const timestamp = new Date().toISOString();
    //   log(`${timestamp} - ${req.method} ${req.url} from ${req.ip}`);
    //   next();
    // });

    this.app.use(express.static('public'));
  }

  socketIOConfig() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => log(`Listening on port: ${this.port}`));
  }
}

module.exports = Server;
