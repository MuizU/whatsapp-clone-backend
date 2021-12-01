const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 5000;

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  // join connection
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // listen for messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // leave the room when the user closes the socket
  socket.leave(roomId);
});
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
