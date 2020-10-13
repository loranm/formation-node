const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const config = require("config");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { origins: "*:*" });

require("./db/mongoose")();
require("./startup/routes")(app);
require("./socketio/socketio")(io);

server.listen(PORT, () => {
  console.log(`${config.get("name")} started at PORT:${PORT}`);
});
