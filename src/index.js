import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


var imgIndexCounter = 0;
let isFirstHover = true;

var numArray = Array.from({length: 99}, (_, index) => index + 1); //create array from 1-99

//toggle sound icon


// const soundIcon = document.querySelector('sound--icon');
// const audio = new Audio(process.env.PUBLIC_URL + '/img/dancepm.mp3');
// let isSoundOn = false;
// console.log(soundIcon);

// soundIcon.addEventListener('click', () => {
//   isSoundOn = !isSoundOn;
//   if (isSoundOn) {
//     soundIcon.src = process.env.PUBLIC_URL + '/img/sound-on.svg'; // Replace with the path to your sound on icon
//   } else {
//     soundIcon.src = process.env.PUBLIC_URL + '/img/sound-off.svg' // Replace with the path to your sound off icon
//   }
//   audio.play();
// });

//shuffle numArray
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

shuffleArray(numArray);

document.addEventListener('DOMContentLoaded', () => {

  document.body.addEventListener('click', (event) => {
    if (event.target.closest('.media--container') || event.target.closest('.streetview--container') || event.target.closest('.sound--icon')) {
      return;
    }
    
    // random generators
    if (imgIndexCounter >= numArray.length) {
      imgIndexCounter = 0;
      shuffleArray(numArray);
    }

    const randomScale = Math.random() * 0.4 + 0.4;
    const randomRotateY = Math.floor(Math.random() * 81) - 40;
    let randomRotateX = Math.floor(Math.random() * 8);
    if (randomRotateY < 0) {
      randomRotateX *= -1;
    }

    var randomImg = document.createElement('img');
    var imgContainer = document.createElement('div');
    imgContainer.className = 'random--img--container';
    
    randomImg.src = process.env.PUBLIC_URL + `/img/added/added${numArray[imgIndexCounter]}.png`;
    imgIndexCounter++;

    randomImg.className = 'added--img--style'
    randomImg.style.position = 'relative';

    imgContainer.style.position = 'absolute';
    imgContainer.style.left = event.pageX - 70 + 'px';
    imgContainer.style.top = event.pageY - 100 + 'px';
    imgContainer.appendChild(randomImg);
    document.body.appendChild(imgContainer);

    randomImg.classList.add('added--img--firstoccurence');

    randomImg.addEventListener('mouseleave', function() {
      setTimeout(() => {
        // randomImg.classList.add('added--img--final');
        randomImg.style.transformOrigin = 'center top';
        randomImg.style.transform = 
          `perspective(1200px)
          scale(${randomScale})
          rotateX(${randomRotateX}deg)
          rotateY(${randomRotateY}deg)
          translateZ(70px)`;
        randomImg.style.zIndex = 999;
        randomImg.style.opacity = 0.4;
        randomImg.style.filter = 'blur(8px)';
        randomImg.style.transition = '2s ease-out filter, 0.4s ease-out transform, 0.4s ease-in box-shadow, 0.4s ease-in opacity';
        randomImg.classList.remove('added--img--firstoccurence');
      }, 500);
    });

    randomImg.addEventListener('mouseenter', function() {
      if (isFirstHover) {
        isFirstHover = false;
        return;
      }
      randomImg.style.transform = 'perspective(1200px) rotate(0deg) scale(1) translateY(0px) translateZ(70px)';
      randomImg.style.filter = 'blur(0px)';
      randomImg.style.boxShadow = '0px 0px 8px 0px rgba(224, 118, 59, 1)';
      randomImg.style.opacity = 1;
      randomImg.style.transitionDuration = '0.4s';
    });

  });

  //scroll events
  window.addEventListener('scroll', () => {
    // rotate flower
    const flowerIcon = document.getElementsByClassName('flower--icon')[0];
    const pageHeight = document.body.scrollHeight;
    const maxScroll = pageHeight - window.innerHeight;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const rotationAngle = (scrollPosition / maxScroll) * 360;
    flowerIcon.style.transform = `rotate(${rotationAngle * 2}deg)`;

  });

  //add grid while resizing
  // // const grid = document.querySelector('.grid--lines');
  // const grid = document.getElementsByClassName('grid--lines')[0];
  // window.addEventListener('resize', handleResize);

  // function handleResize() {
  //   console.log(grid);
  //   // grid.classList.add('grid--show');
  //   setTimeout(() => {
  //     // grid.classList.remove('during-resize');
  //   }, 200);
  // }
  

});

  //gets rid of screen overlay when hovering over media container
  setTimeout(() => {
    const mediaContainers = [...document.getElementsByClassName('media--container')];
    mediaContainers.forEach(mediaContainer => {
      mediaContainer.addEventListener('mouseenter', () => {
        const screenOverlay = mediaContainer.getElementsByClassName('screen--overlay')[0];
        screenOverlay.style.opacity = 0;
        screenOverlay.style.height = '360px'
        screenOverlay.style.transition = '0.3s ease-in height, 1s ease-in-out opacity , 1s ease-in-out visibility';
        screenOverlay.style.visibility = 'hidden';

      });

      mediaContainer.addEventListener('mouseleave', () => {
        const screenOverlay = mediaContainer.getElementsByClassName('screen--overlay')[0];
        screenOverlay.style.opacity = 1;
        screenOverlay.style.visibility = 'visible';
        screenOverlay.style.height = '184px';
        screenOverlay.style.transition = '0.3s ease-in height, 1s ease-in opacity';
      })
    });
  }, 100);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
