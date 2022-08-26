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
  visited: false,
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

/**
 * TODO: Docs
 * @param {*} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {string} color
 */
const circle = (ctx, x, y, radius, color) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

/**
 * TODO: Docs
 * @param {*} ctx
 * @param {{x0: number, y0: number}} coord0
 * @param {{x1: number, y1: number}} coord1
 * @param {{x2: number, y2: number}} coord2
 * @param {string} color
 */
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
 * TODO: Docs
 * @param {*} ctx
 * @param {number} w
 * @param {number} h
 */
const rotate = (ctx, w, h) => {
  const ratio = 525;
  const centerX = w / 2;
  const centerY = h / 2;

  ctx.translate(centerX, centerY);
  ctx.rotate(Math.PI / ratio);
  ctx.translate(-centerX, -centerY);
};

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

const draw = () => {
  // Clear canvas on each iteration
  clearCanvas(ctx);

  rotate(ctx, w, h);
  renderShapes(ctx);

  ctx.restore();
  window.requestAnimationFrame(draw);
};

const isInsideRedCircle = (mouseX, mouseY) => {
  const dx = mouseX - redCircle.x;
  const dy = mouseY - redCircle.y;

  return Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(redCircle.radius, 2);
};

/**
 * TODO: Docs
 *
 * Inspiration: http://www.java2s.com/example/javascript/canvas/adding-mouse-hover-animation-to-html5-canvas-drawings.html
 * @param {*} event
 */
const handleOnMouseMove = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const offsetX = $("#canvas").offset().left;
  const offsetY = $("#canvas").offset().top;

  const mouseX = parseInt(event.clientX - offsetX);
  const mouseY = parseInt(event.clientY - offsetY);

  const insideRedCircle = isInsideRedCircle(mouseX, mouseY);

  if (insideRedCircle && !redCircle.visited) {
    clearCanvas(ctx);

    // Update red circle with new color
    redCircle.color = BLUE_RGBA;
    redCircle.visited = insideRedCircle;

    renderShapes(ctx);
  } else if (!insideRedCircle && redCircle.visited) {
    clearCanvas(ctx);
    redCircle.color = RED_RGBA;
    redCircle.visited = insideRedCircle;
    renderShapes(ctx);
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
