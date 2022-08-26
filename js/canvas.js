const GREEN_RGBA = "rgba(74, 222, 128, 0.7)";
const ORANGE_RGBA = "rgba(251, 146, 60, 0.7)";
const RED_RGBA = "rgba(248, 113, 113, 0.7)";
const YELLOW_RGBA = "rgba(250, 204, 21, 0.7)";
const MAGENTA_RGBA = "rgba(232, 121, 249, 0.7)";
const BLUE_RGBA = "rgba(56, 189, 248, 0.7)";

const canvas = $("#canvas")[0];
const ctx = canvas.getContext("2d");
const w = canvas.width;
const h = canvas.height;

const greenSquare = {
  x: w * 0.3,
  y: h * 0.2,
  width: w * 0.15,
  height: h * 0.15,
  color: GREEN_RGBA,
};

const orangeSquare = {
  x: w * 0.2,
  y: h * 0.1,
  width: w * 0.3,
  height: h * 0.1,
  color: ORANGE_RGBA,
};

const redCircle = {
  x: w * 0.5,
  y: h * 0.5,
  radius: 20,
  color: RED_RGBA,
  hasBeenVisited: false,
};

const yellowCircle = {
  x: w * 0.45,
  y: h * 0.15,
  radius: 15,
  color: YELLOW_RGBA,
};

const magentaTriangle = {
  startX: w * 0.3,
  startY: h * 0.2,
  offsetX: 80,
  offsetY: 0,
  secondOffsetX: 40,
  secondOffsetY: 80,
  color: MAGENTA_RGBA,
};

/**
 * TODO: Docs
 * @param {*} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {string} color
 */
const square = (ctx, x, y, width, height, color) => {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
};

const circle = (ctx, x, y, radius, color) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

const triangle = (ctx, { x0, y0 }, { x1, y1 }, { x2, y2 }, color) => {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

const renderGreenSquare = (ctx) => {
  square(
    ctx,
    greenSquare.x,
    greenSquare.y,
    greenSquare.width,
    greenSquare.height,
    greenSquare.color
  );
};

const renderOrangeSquare = (ctx) => {
  square(
    ctx,
    orangeSquare.x,
    orangeSquare.y,
    orangeSquare.width,
    orangeSquare.height,
    orangeSquare.color
  );
};

const renderRedCircle = (ctx) => {
  circle(ctx, redCircle.x, redCircle.y, redCircle.radius, redCircle.color);
};

const renderYellowCircle = (ctx) => {
  circle(
    ctx,
    yellowCircle.x,
    yellowCircle.y,
    yellowCircle.radius,
    yellowCircle.color
  );
};

const renderMagentaTriangle = (ctx) => {
  const startX = magentaTriangle.startX;
  const startY = magentaTriangle.startY;

  triangle(
    ctx,
    {
      x0: startX,
      y0: startY,
    },
    {
      x1: startX + magentaTriangle.offsetX,
      y1: startY + magentaTriangle.offsetY,
    },
    {
      x2: startX + magentaTriangle.secondOffsetX,
      y2: startY + magentaTriangle.secondOffsetY,
    },
    magentaTriangle.color
  );
};

/**
 * Rotates the canvas. This is used in a eternal loop to make the canvas spin continuously.
 * @param {*} ctx is the current canvas context
 * @param {number} w is the width of the canvas
 * @param {number} h is the height of the canvas
 */
const rotate = (ctx, w, h) => {
  const ratio = 500;
  const centerX = w / 2;
  const centerY = h / 2;

  ctx.translate(centerX, centerY);
  ctx.rotate(Math.PI / ratio);
  ctx.translate(-centerX, -centerY);
};

/**
 * Renders all shapes used in the canvas.
 * @param {*} ctx is the current canvas context
 */
const renderShapes = (ctx) => {
  renderGreenSquare(ctx);
  renderOrangeSquare(ctx);
  renderRedCircle(ctx);
  renderYellowCircle(ctx);
  renderMagentaTriangle(ctx);
};

const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, w, h);
};

/**
 * Draws the canvas each frame.
 * The canvas is cleared, rotated and re-rendered every frame.
 */
const draw = () => {
  // Clear canvas on each iteration
  clearCanvas(ctx);

  rotate(ctx, w, h);
  renderShapes(ctx);

  ctx.restore();
  window.requestAnimationFrame(draw);
};

/**
 * Inspiration: http://www.java2s.com/example/javascript/canvas/adding-mouse-hover-animation-to-html5-canvas-drawings.html
 *
 * @param {*} mouseX is the x coordinate of the mouse
 * @param {*} mouseY is the y coordinate of the mouse
 * @returns a boolean indicating if the mouse is within the bounds of the red circle shape
 */
const isInsideRedCircle = (mouseX, mouseY) => {
  const dx = mouseX - redCircle.x;
  const dy = mouseY - redCircle.y;

  return Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(redCircle.radius, 2);
};

/**
 * Updates the state of the red circle based on the mouse position.
 *
 * @param {*} ctx is the current canvas context
 * @param {*} isInsideRedCircle is a boolean indicating if the mouse cooredinates is inside the red circle
 * @param {*} targetColor is the color to change the red circle to
 */
const updateRedCircle = (ctx, isInsideRedCircle, targetColor) => {
  clearCanvas(ctx);
  redCircle.color = targetColor;
  redCircle.hasBeenVisited = isInsideRedCircle;
  renderShapes(ctx);
};

/**
 * Handles logic related to the mouse move event.
 *
 * Inspiration: http://www.java2s.com/example/javascript/canvas/adding-mouse-hover-animation-to-html5-canvas-drawings.html
 * @param {*} event is the mouse event
 */
const handleOnMouseMove = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const offsetX = $("#canvas").offset().left;
  const offsetY = $("#canvas").offset().top;

  const mouseX = parseInt(event.pageX - offsetX);
  const mouseY = parseInt(event.pageY - offsetY);

  const insideRedCircle = isInsideRedCircle(mouseX, mouseY);

  if (insideRedCircle && !redCircle.hasBeenVisited) {
    updateRedCircle(ctx, insideRedCircle, BLUE_RGBA);
  } else if (!insideRedCircle && redCircle.hasBeenVisited) {
    updateRedCircle(ctx, insideRedCircle, RED_RGBA);
  }
};

const initialize = () => {
  window.requestAnimationFrame(draw);

  $("#canvas").mousemove((event) => {
    handleOnMouseMove(event);
  });
};

$(document).ready(() => {
  initialize();
});
