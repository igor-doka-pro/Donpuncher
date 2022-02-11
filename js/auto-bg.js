"use strict";

const header = document.querySelector('.page-header');

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function load(src) {
  return new Promise(function(resolve, reject) {
      const image = new Image();
      image.src = src;
      image.addEventListener('load', resolve);
      image.addEventListener('error', reject);
  });
}

function changeBg() {
  let path = `/img/bg${getRandom(1, 5)}.jpg`;
  
  load(path).then(() => {
    header.style.backgroundImage = `url(${path})`;
  });
}


setInterval(changeBg, 3000);

 