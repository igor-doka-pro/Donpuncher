'use strict';

const mask = document.querySelector('.mask'),
      beforeBlockMask = document.querySelector('.classes-list figure'),
      textInMask = document.querySelector('.join-club-description');

window.addEventListener('scroll', function(evt) {
  evt.preventDefault();
  

  let preCoordinateScrollY = beforeBlockMask.getBoundingClientRect().top;
  let postCoordinateScrollY = textInMask.getBoundingClientRect().top;


  if ( (preCoordinateScrollY < (-beforeBlockMask.offsetHeight / 3)) && (postCoordinateScrollY > 0) ) {
    mask.style.opacity = '0.6';
  } else {
    mask.style.opacity = '0.4';
  }

  
});