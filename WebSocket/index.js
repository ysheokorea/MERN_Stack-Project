const io = require("socket.io")(9998, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// socket ID Array
let users = [];

const addUser = (userId, socketId) => {
  // check inside users
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  
  const temp = users.find((user) => user.userId === receiverId);
  return temp;

};

io.on("connection", (socket) => {
  console.log("WebSocket Connected ..");

  // Take socket Id From Client
  socket.on("addUser", (user) => {
    addUser(user._id, socket.id);
    io.emit("getUsers", users);
  });

  // send + receive message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("WebSocket Disconnected ..");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
