import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;

const choosePainter = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });

  const startGame = () => {
    //choose leader and random word , notify to everyone
    if (inProgress === false) {
      inProgress = true; // game in progress
      const painter = choosePainter(); // sockets[0] || sockets[1]
      word = chooseWord();
      setTimeout(() => {
        superBroadcast(events.gameStarted);
        io.to(painter.id).emit(events.leaderNotif, { word }); // emit to specific socket
      }, 2000);
    }
  };
  const endGame = () => {
    inProgress = false;
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
    if (sockets.length === 2) {
      startGame();
    }
  });

  socket.on(events.disconnect, () => {
    // disconnect is socketIO's library function
    sockets = sockets.filter(aSocket => aSocket.nickname !== socket.nickname);
    if (sockets.length === 1) {
      endGame();
    }
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

  socket.on(events.sendMessage, ({ message }) => {
    broadcast(events.newMessage, { message, nickname: socket.nickname });
  });

  socket.on(events.beginPath, ({ x, y }) => {
    broadcast(events.beganPath, { x, y });
  });

  socket.on(events.strokePath, ({ x, y, color }) => {
    broadcast(events.strokedPath, { x, y, color });
  });

  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
};

export default socketController;
