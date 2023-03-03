const circle = document.getElementById("circle");
const number = document.getElementById("number");
const hitsound = document.getElementById("hitsound");
const points = document.getElementById("points");
const bar = document.getElementById("bar");
const healthBar = document.getElementById("healthBar");
const fail = document.getElementById("fail");
const area = document.getElementById("area");
const back = document.getElementById("back");
const retry = document.getElementById("retry");
const failMenu = document.getElementById("failMenu");

let id = 0;
let score = 0;
let health = 400;
let healthDrain = 2;
let x = 0;
let y = 0;

setInterval(() => {
  ax = area.offsetWidth - 126;
  by = area.offsetHeight - 126;
}, 0);

// Funkce pro životy
function drain() {
  draining = setInterval(() => {
    health -= healthDrain;
    bar.style.width = health + "px";
    bar.style.transition = "0.1s";
  }, 100);

  drainAgain = setInterval(() => {
    healthDrain += 2;
  }, 10000);

  setInterval(() => {
    if (health > 400) {
      health = 400;
    }
  }, 0);

  setInterval(() => {
    if (healthDrain >= 10) {
      clearInterval(drainAgain);
    }
    if (health <= 0) {
      clearInterval(drainAgain);
      clearInterval(draining);
      clearTimeout(anim);
      clearTimeout(time);
      circle.style.opacity = "0";
      circle.style.transition = "4s";
      circle.style.pointerEvents = "none";
      area.style.opacity = "0";
      area.style.transition = "3s";
      bar.style.opacity = "0.5";
      bar.style.transition = "4s";
      healthBar.style.opacity = "0.5";
      healthBar.style.transition = "4s";
      points.style.opacity = "0.5";
      points.style.transition = "4s";
      fail.play();
      fail.volume = 0.2;
      health = 100;

      setTimeout(() => {
        circle.style.display = "none";
        back.style.display = "block";
        retry.style.display = "block";
      }, 2800);
      setTimeout(() => {
        back.style.opacity = "1";
        back.style.transition = "0.2s";
        retry.style.opacity = "1";
        retry.style.transition = "0.2s";
      }, 3000);
    }
  }, 0);
}

// Funkce pro změnu polohy
function poloha() {
  x = circle.style.top = Math.round(Math.random() * by) + "px";
  y = circle.style.left = Math.round(Math.random() * ax) + "px";
  circle.style.opacity = "1";
  number.style.opacity = "1";
  circle.style.transition = "0s";
  number.style.transition = "0s";
  id++;
  number.innerHTML = `${id}`;
  if (id > 9) {
    id = 1;
    number.innerHTML = `${id}`;
  }
}

// Funkce pro animaci zmizení
function Trans() {
  circle.style.opacity = "0";
  number.style.opacity = "0";
  circle.style.transition = "1s";
  number.style.transition = "1s";
  circle.style.display = "block";
  number.style.display = "block";
  time = setTimeout(poloha, 500);
}

// Funkce pro zmizení
function Disappear() {
  circle.style.display = "none";
  number.style.display = "none";
}

let time = setTimeout(poloha, 500);
let anim = setInterval(Trans, 1000);

// Circle click
circle.onclick = () => {
  hitsound.play();
  hitsound.volume = 0.1;
  poloha();
  clearTimeout(anim);
  clearTimeout(time);
  anim = setInterval(Trans, 1000);
  score += 300;
  health += 50;
  points.innerHTML = `${score}`;

  if (id > 9) {
    id = 1;
    number.innerHTML = `${id}`;
  }
};

// Retry button
retry.onclick = () => {
  id = 0;
  circle.style.opacity = "1";
  circle.style.transition = "0s";
  area.style.opacity = "1";
  area.style.transition = "0s";
  bar.style.opacity = "1";
  bar.style.transition = "0s";
  healthBar.style.opacity = "1";
  healthBar.style.transition = "0s";
  points.style.opacity = "1";
  points.style.transition = "0s";
  retry.style.display = "none";
  back.style.display = "none";
  health += 400;
  healthDrain = 2;
  setTimeout(() => {
    drain();
    x = circle.style.top = Math.round(Math.random() * by) + "px";
    y = circle.style.left = Math.round(Math.random() * ax) + "px";
    clearTimeout(anim);
    clearTimeout(time);
    anim = setInterval(Trans, 1000);
    circle.style.pointerEvents = "all";
  }, 1000);
};

// Co se stane po načtení stránky
window.onload = () => {
  drain();
  x = circle.style.top = Math.round(Math.random() * by) + "px";
  y = circle.style.left = Math.round(Math.random() * ax) + "px";
  clearTimeout(anim);
  clearTimeout(time);
  anim = setInterval(Trans, 1000);
  id = 1;
};
