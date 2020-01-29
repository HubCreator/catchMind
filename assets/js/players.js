import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls
} from "./draw";

const board = document.getElementById("jsPlayerBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  // disable canvas events
  disableCanvas();
  // hide the canvas controls
  hideControls();
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  notifs.innerText = "";
  notifs.innerText = `You are the painter. The word is ${word}`;
};
