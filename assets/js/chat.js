const messages = document.getElementById("jsMessages");
const sendMessage = document.getElementById("jsSendMessage");

const appendMessage = (text, nickname) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="author ${nickname ? "out" : "self"}">${
    nickname ? nickname : "You"
  } : </span>${text}`;
  messages.appendChild(li);
};

const handleSendMessage = event => {
  event.preventDefault();
  const input = sendMessage.querySelector("input");
  const { value } = input;
  input.value = "";
  appendMessage(value, window.nickname);
};

if (sendMessage) {
  sendMessage.addEventListener("submit", handleSendMessage);
}
