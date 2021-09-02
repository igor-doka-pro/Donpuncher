"use strict";

const bg = document.querySelector('.page__header');

let getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

let changeBackground = () => {
  bg.style.backgroundImage = `url(/img/bg${getRandom(1, 5)}.jpg)`;
};


setInterval(changeBackground, 3000);