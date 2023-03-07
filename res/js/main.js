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
const miss = document.getElementById("miss");
const failScore = document.getElementById("failScore");
const fail300 = document.getElementById("fail300");
const failCombo = document.getElementById("failCombo");
const failMiss = document.getElementById("failMiss");
const comboCounter = document.getElementById("comboCounter");
const result = document.getElementById("result");

let id = 0;
let score = 0;
let health = 400;
let healthDrain = 2;
let x = 0;
let y = 0;
let mistake = 0;
let o = 0;
let p = 0;
let combo = 1;
let perfect = 0;

setInterval(() => {
  ax = area.offsetWidth - 126;
  by = area.offsetHeight - 126;
}, 0);

// Funkce pro životy
function drain() {
  id = 0;
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
      clearTimeout(oops);
      circle.style.opacity = "0";
      circle.style.transition = "4s";
      circle.style.pointerEvents = "none";
      area.style.opacity = "0";
      area.style.transition = "3s";
      bar.style.opacity = "0";
      bar.style.transition = "4s";
      healthBar.style.opacity = "0";
      healthBar.style.transition = "4s";
      points.style.opacity = "0";
      points.style.transition = "4s";
      miss.style.opacity = "0";
      comboCounter.style.opacity = "0";
      comboCounter.style.transition = "4s";
      fail.play();
      fail.volume = 0.2;
      health = 100;

      setTimeout(() => {
        circle.style.display = "none";
        back.style.display = "block";
        retry.style.display = "block";
        result.style.display = "block";
        failCombo.style.display = "block";
        fail300.style.display = "block";
        failMiss.style.display = "block";
        failScore.style.display = "block";
        area.style.display = "none";
        points.style.display = "none";
        comboCounter.style.display = "none";
        healthBar.style.display = "none";
        circle.style.display = "none";
        failScore.innerHTML = `${score}`;
        fail300.innerHTML = `${perfect}`;
        failMiss.innerHTML = `${mistake}`;
        failCombo.innerHTML = `${combo}`;
      }, 2800);
      setTimeout(() => {
        back.style.opacity = "1";
        back.style.transition = "0.2s";
        retry.style.opacity = "1";
        retry.style.transition = "0.2s";
        failScore.style.opacity = "1";
        failScore.style.transition = "0.2s";
        result.style.opacity = "1";
        result.style.transition = "0.2s";
      }, 3000);
    }
  }, 0);
}

function missed() {
  mistake++;
  miss.style.display = "block";
  miss.style.opacity = "1";
  miss.style.transition = "0s";
  health -= 50;
  combo = 1;
  comboCounter.innerHTML = `${combo}x`;
}
// Funkce pro změnu polohy
function poloha() {
  x = circle.style.top = Math.round(Math.random() * by) + "px";
  y = circle.style.left = Math.round(Math.random() * ax) + "px";
  setTimeout(() => {
    o = x;
    p = y;
  }, 400);
  setTimeout(() => {
    miss.style.opacity = "0";
    miss.style.transition = "0.2s";
  }, 700);
  miss.style.top = o;
  miss.style.left = p;
  circle.style.opacity = "1";
  number.style.opacity = "1";
  circle.style.transition = "0s";
  number.style.transition = "0s";
  miss.style.opacity = "0";

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
  oops = setTimeout(missed, 500);
}

// Funkce pro zmizení
function Disappear() {
  circle.style.display = "none";
  number.style.display = "none";
}

let time = setTimeout(poloha, 500);
let anim = setInterval(Trans, 1000);
let oops = setTimeout(missed, 500);

// Circle click
circle.onclick = () => {
  hitsound.play();
  hitsound.volume = 0.1;
  poloha();
  clearTimeout(anim);
  clearTimeout(time);
  clearTimeout(oops);
  anim = setInterval(Trans, 1000);
  score += 300;
  health += 50;
  combo++;
  perfect++;
  points.innerHTML = `${score}`;
  comboCounter.innerHTML = `${combo}x`;
  if (id == 1) {
    score += 300 * combo;
    points.innerHTML = `${score}`;
  }

  if (id > 9) {
    id = 1;
    number.innerHTML = `${id}`;
  }
};

// Retry button
retry.onclick = () => {
  id = 0;
  mistake = 0;
  perfect = 0;
  combo = 1;
  score = 0;
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
  result.style.display = "none";
  area.style.display = "block";
  points.style.display = "block";
  comboCounter.style.display = "block";
  healthBar.style.display = "block";
  health += 400;
  healthDrain = 2;
  setTimeout(() => {
    x = circle.style.top = Math.round(Math.random() * by) + "px";
    y = circle.style.left = Math.round(Math.random() * ax) + "px";
    clearTimeout(anim);
    clearTimeout(time);
    clearTimeout(oops);
    anim = setInterval(Trans, 1000);
    circle.style.pointerEvents = "all";
  }, 1000);
  deletus = setInterval(() => {
    clearTimeout(oops);
  }, 1);
  setTimeout(() => {
    clearInterval(deletus);
  }, 3000);
  setTimeout(() => {
    drain();
  }, 2000);
};

// Co se stane po načtení stránky
window.onload = () => {
  comboCounter.innerHTML = `${combo}x`;
  clearTimeout(anim);
  clearTimeout(oops);
  setTimeout(() => {
    drain();
  }, 1000);
  anim = setInterval(Trans, 1000);
  deletus = setInterval(() => {
    clearTimeout(oops);
  }, 1);
  setTimeout(() => {
    clearInterval(deletus);
  }, 2000);
};
