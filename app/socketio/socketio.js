module.exports = (io) => {
  const onConnection = (socket) => {
    console.log("connected");
    socket.on("message", function (message) {
      // socket.emit("ditConsumer", message.value);
      console.log("from console", message.value);
      socket.emit("coucou", { message: "we are conneted" });
    });
  };

  io.on("connection", onConnection);
};
