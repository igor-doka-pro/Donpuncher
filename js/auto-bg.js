"use strict";

const bg = document.querySelector('.page-header');

let getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

let timerId = setTimeout(function changeBackground() {
  bg.style.backgroundImage = `url(/img/bg${getRandom(1, 5)}.jpg)`;
  timerId = setTimeout(changeBackground, 3000);
}, 3000);
