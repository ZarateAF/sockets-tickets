const socketController = (socket) => {
  socket.on("disconnect", () => {
    console.log("Disconnected", socket.id);
  });

  socket.on("send-msg", (payload, callback) => {
    const id = 45678;
    callback(id);
    socket.broadcast.emit("send-msg", payload);
  });
};

module.exports = {
  socketController,
};
