const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);
    this.path = {};

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();

    //Sockets
    this.sockets();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  routes() {
    // this.app.use(this.path.auth, require("../routes/auth.routes"));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server running on PORT: ", this.port);
    });
  }
}

module.exports = Server;
