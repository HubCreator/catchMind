import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

context.strokeStyle = "#2c2c2c";
context.lineWidth = 2.5;

let painting = false;
let filling = true;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

const beginPath = (x, y) => {
  context.beginPath();
  context.moveTo(x, y);
};

const strokePath = (x, y) => {
  context.lineTo(x, y);
  context.stroke();
};

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    strokePath(x, y);
    getSocket().emit(window.events.strokePath, { x, y });
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  if (filling == false) {
    canvas.style.backgroundColor = color;
  } else {
    context.strokeStyle = color;
  }
}

function handleRangeChange(event) {
  context.lineWidth = event.target.value;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Paint";
  } else {
    filling = true;
    mode.innerText = "Fill";
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

export const handleBeganPath = ({ x, y }) => {
  beginPath(x, y);
};

export const handleStrokedPath = ({ x, y }) => {
  strokePath(x, y);
};
