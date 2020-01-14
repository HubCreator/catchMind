import { handleNewUser, handleDisconnected } from "./notifications";
import { handleNewMessage } from "./chat";

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
};
