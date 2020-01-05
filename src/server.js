import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 5000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));

const handleListening = () => {
  console.log(`Server running: http://localhost:${PORT}`);
  // console.log(__dirname);
  // console.log(join(__dirname, "views"));
};

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", socket => {
  // socket.emit : Send messages from server to client(browser) directly
  // socket.broadcast.emit : Send message all clients except the connected client
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickname: socket.nickname || "Anonymous"
    });
  });
  socket.on("setNickName", ({ nickname }) => {
    socket.nickname = nickname; // User can make varibales under socket object
  });
});
