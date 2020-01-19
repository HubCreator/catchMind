import { handleNewUser, handleDisconnected } from "./notifications";
import { handleNewMessage } from "./chat";
import { handleBeganPath, handleStrokedPath, handleFilled } from "./draw";
let socket = null;

export const getSocket = () => socket;

export const updateSocket = aSocket => {
  socket = aSocket;
};

export const initSockets = aSocket => {
  const { events } = window;
  updateSocket(aSocket); // socket which is working now
  aSocket.on(events.newUser, handleNewUser);
  aSocket.on(events.disconnected, handleDisconnected);
  aSocket.on(events.newMessage, handleNewMessage);
  aSocket.on(events.beganPath, handleBeganPath);
  aSocket.on(events.strokedPath, handleStrokedPath);
  aSocket.on(events.filled, handleFilled);
};
