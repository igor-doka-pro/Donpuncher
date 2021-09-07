"use strict";


const socialButtons = document.querySelectorAll('.social-item svg path'),
      socialLi = document.querySelectorAll('.social-item');

const buttonChangeColorHandler = (evt) => {
  socialButtons.forEach(button => {
    if (button == evt.target) {
      button.style.fill = '#0090f2';
      button.style.transition = '0.3s';
    }
  });
};

const buttonDefaultColorHandler = (evt) => {
  socialButtons.forEach(button => {
    if (button == evt.target) {
      button.style.fill = '#fff';
      button.style.transition = '0.3s';
    }
  });
};

socialLi.forEach(li => {
  li.addEventListener('mouseover', buttonChangeColorHandler);
  li.addEventListener('mouseout', buttonDefaultColorHandler);
});