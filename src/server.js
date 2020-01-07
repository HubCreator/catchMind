import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import morgan from "morgan";
import socketController from "./socketController";

const PORT = 5000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));

const handleListening = () => {
  console.log(`Server running: http://localhost:${PORT}`);
  // console.log(__dirname);
  // console.log(join(__dirname, "views"));
};

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", socket => socketController(socket));
