const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require("../database/config");


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
        uploads: '/api/uploads',
        wizzards: '/api/wizzards',
        curses: '/api/curses'
    };

    this.middlewares();

    this.conectarDB();

    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Body parse
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));

    //express fileupload
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));        


  }

  async conectarDB(){
    await dbConnection();
  }

  routes(){
    this.app.use(this.paths.wizzards, require('../routes/wizzards'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
    this.app.use(this.paths.curses, require('../routes/curses'));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
