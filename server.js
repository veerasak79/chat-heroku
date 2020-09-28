// check port on server
//heroku logs --tail --app livechatbig 


const io = require("socket.io")();

let currentUserId = 2;
let currentMessageId = 1;
const userIds = {};

const PORT = process.env.PORT || 3002

function createMessage(userId, messageText) {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: userId,
      name: "Test User",
      avatar: "https://placeimg.com/140/140/any",
    },
  };
}

io.on("connection", (socket) => {
  console.log("a user connected!");
  console.log(socket.id);
  userIds[socket.id] = currentUserId++;

  socket.on("message", (messageText) => {
    //console.log(messageText);
    // io.emit("message", messageText );
    const userId = userIds[socket.id];
    const message = createMessage(userId, messageText);
    //console.log(message);
    socket.broadcast.emit("message", message);
  });
});

console.log(`Serer2 is running. ${PORT}`)

io.listen(PORT, ()=>{
  console.log(`Serer is running. ${PORT}`)
})
