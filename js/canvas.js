const GREEN_RGBA = "rgba(74, 222, 128, 0.7)";
const ORANGE_RGBA = "rgba(251, 146, 60, 0.7)";
const RED_RGBA = "rgba(248, 113, 113, 0.7)";
const YELLOW_RGBA = "rgba(250, 204, 21, 0.7)";
const MAGENTA_RGBA = "rgba(232, 121, 249, 0.7)";
const BLUE_RGBA = "rgba(56, 189, 248, 0.7)";

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

const renderGreenSquare = (ctx, w, h) => {
  square(ctx, w * 0.3, h * 0.2, w * 0.15, h * 0.15, GREEN_RGBA);
};

const renderOrangeSquare = (ctx, w, h) => {
  square(ctx, w * 0.2, h * 0.1, w * 0.3, h * 0.1, ORANGE_RGBA);
};

const renderRedCircle = (ctx, w, h) => {
  circle(ctx, w * 0.5, h * 0.5, 20, RED_RGBA);
};

const renderYellowCircle = (ctx, w, h) => {
  circle(ctx, w * 0.45, h * 0.15, 15, YELLOW_RGBA);
};

const renderMagentaTriangle = (ctx, w, h) => {
  const startX = w * 0.3;
  const startY = h * 0.2;
  triangle(
    ctx,
    {
      x0: startX,
      y0: startY,
    },
    {
      x1: startX + 80,
      y1: startY + 0,
    },
    {
      x2: startX + 40,
      y2: startY + 80,
    },
    MAGENTA_RGBA
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

const draw = () => {
  const canvas = $("#canvas")[0];
  const ctx = canvas.getContext("2d");

  const w = canvas.width;
  const h = canvas.height;

  // Clear canvas on each iteration
  ctx.clearRect(0, 0, w, h);

  rotate(ctx, w, h);

  renderGreenSquare(ctx, w, h);
  renderOrangeSquare(ctx, w, h);
  renderRedCircle(ctx, w, h);
  renderYellowCircle(ctx, w, h);
  renderMagentaTriangle(ctx, w, h);

  ctx.restore();

  window.requestAnimationFrame(draw);
};

const isInsideMagentaTriangle = (x, y) => {
  // TODO
};

const isInsideRedCircle = (x, y) => {
  // TODO
};

const handleOnMouseMove = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const offsetX = $("#canvas").offset().left;
  const offsetY = $("#canvas").offset().top;

  const mouseX = parseInt(event.clientX - offsetX);
  const mouseY = parseInt(event.clientY - offsetY);

  const isInsideMagentaTriangle = isInsideMagentaTriangle(mouseX, mouseY);
  const isInsideRedCircle = isInsideRedCircle(mouseX, mouseY);

  if (isInsideMagentaTriangle) {
    // Change color of triangle to BLUE_RGBA
  } else if (isInsideRedCircle) {
    // Scale red circle according to keyframe
  }
};

const initialize = () => {
  $("#canvas").mousemove((event) => {
    handleOnMouseMove(event);
  });
  window.requestAnimationFrame(draw);
};

$(document).ready(() => {
  initialize();
});
