const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 5000;

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  // listen for messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.emit(NEW_CHAT_MESSAGE_EVENT, data);
  });
});
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
