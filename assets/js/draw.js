import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.fillStyle = "white";
context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
context.strokeStyle = INITIAL_COLOR;
context.fillStyle = INITIAL_COLOR;
context.lineWidth = 2.5;

let painting = false;
let filling = false;

const stopPainting = () => (painting = false);

const startPainting = () => (painting = true);

const beginPath = (x, y) => {
  context.beginPath(); // ready to start
  context.moveTo(x, y); // from
};

const strokePath = (x, y, color = null) => {
  let currentColor = context.strokeStyle;
  if (color !== null) {
    context.strokeStyle = color;
  }
  context.lineTo(x, y); // to
  context.stroke(); // make a line
  context.strokeStyle = currentColor;
};

const onMouseMove = event => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    strokePath(x, y);
    getSocket().emit(window.events.strokePath, {
      x,
      y,
      color: context.strokeStyle
    });
  }
};

const handleColorClick = event => {
  const color = event.target.style.backgroundColor;
  context.strokeStyle = color;
  context.fillStyle = color;
};

const handleModeClick = () => {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
};

const fill = (color = null) => {
  let currentColor = context.fillStyle;
  if (color !== null) context.fillStyle = color;
  context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  context.fillStyle = currentColor;
};

const handleRangeChange = event => {
  context.lineWidth = event.target.value;
};

const handleCanvasClick = () => {
  if (filling) {
    fill();
    getSocket().emit(window.events.fill, { color: context.fillStyle });
  }
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
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

export const handleStrokedPath = ({ x, y, color }) => {
  strokePath(x, y, color);
};

export const handleFilled = ({ color }) => {
  fill(color);
};
