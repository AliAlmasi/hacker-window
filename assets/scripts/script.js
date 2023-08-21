"use strict";

const root = {
  wavecolor: {
    r: 0,
    g: 255,
    b: 0,
  },
  rainbowSpeed: 0.2,
  rainbow: false,
  matrixSpeed: 35,
};

const c = document.getElementById("background");
const ctx = c.getContext("2d");

const hueFw = false;
let hue = -0.01;

c.height = window.innerHeight;
c.width = window.innerWidth;

const letters =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyza!@#$%^&*()-+=/*{}[]:;\"\\'?,.<>"; // ゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ
const characters = letters.split("");
const font_size = 11;
const columns = c.width / font_size;
const gradient = ctx.createLinearGradient(0, 10, 0, 200);
let drops = [];
for (let x = 0; x < columns; x++) drops[x] = 0;

function draw() {
  ctx.fillStyle = "rgba(0,0,0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "#000";
  ctx.font = font_size + "px Cascadia Mono Semibold, monospace";

  for (let i = 0; i < drops.length; i++) {
    ctx.fillStyle = "rgba(10,10,10, 1)";
    ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
    const text = characters[Math.floor(Math.random() * characters.length)];

    if (root.rainbow) {
      hue += hueFw ? 0.01 : -0.01;
      const rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
      const rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
      const rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
      ctx.fillStyle = `rgba(${rr},${rg},${rb})`;
    } else {
      ctx.fillStyle =
        "rgba(" +
        root.wavecolor.r +
        "," +
        root.wavecolor.g +
        "," +
        root.wavecolor.b +
        ")";
    }

    ctx.fillText(text, i * font_size, drops[i] * font_size);
    drops[i]++;
    if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;
  }
}

window.onresize = () => {
  location.reload();
};

setInterval(draw, root.matrixSpeed);

const windowTitleEl = document.getElementById(`window_title-date`);
const nowYear = new Date().getFullYear();
windowTitleEl.textContent = nowYear;
