const playerInfo = document.getElementById("jsParticipants");

const showPlayerInfo = sockets => {
  sockets.forEach(aSocket => {
    //const span = document.createElement("span");
    playerInfo.innerText = aSocket.nickname + " ";
    // playerInfo.appendChild(span);
  });
};

export const handlePlayerUpdate = ({ sockets }) => {
  playerInfo.innerText = "";
  showPlayerInfo(sockets);
};
