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
  square(ctx, w * 0.3, h * 0.2, w * 0.15, h * 0.15, "#4ade80");
};

const renderOrangeSquare = (ctx, w, h) => {
  square(ctx, w * 0.2, h * 0.1, w * 0.3, h * 0.15, "#fb923c");
};

const renderRedCircle = (ctx, w, h) => {
  circle(ctx, w * 0.45, h * 0.55, 20, "#f87171");
};

const renderYellowCircle = (ctx, w, h) => {
  circle(ctx, w * 0.5, h * 0.15, 15, "#facc15");
};

const renderMagentaTriangle = (ctx, w, h) => {
  const startX = w * 0.3;
  const startY = h * 0.25;
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
    "#e879f9"
  );
};

$(document).ready(() => {
  const canvas = $("#canvas")[0];
  const ctx = canvas.getContext("2d");

  const w = canvas.width;
  const h = canvas.height;

  renderGreenSquare(ctx, w, h);
  renderOrangeSquare(ctx, w, h);
  renderRedCircle(ctx, w, h);
  renderYellowCircle(ctx, w, h);
  renderMagentaTriangle(ctx, w, h);
});
