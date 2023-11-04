import './App.css';
import Header from './components/Header';
import TravelLog from './components/TravelLog';
import React, { useEffect, useState } from 'react';
import data from './data';

const audio = new Audio(process.env.PUBLIC_URL + '/img/dancepm.mp3');
audio.preload = "auto";


function App() {
  const travelLogs = data.map(item => (
    <TravelLog key={item.id} item={item} />
  ));


  window.addEventListener('resize', handleResize);
  function handleResize() {
      const grid = document.querySelector('.grid--lines');
      grid.style.visibility = 'visible';
      grid.style.opacity = 1;

      setTimeout(() => {
        grid.style.opacity = 0;
      }, 1000);

      setTimeout(() => {
        grid.style.visibility = 'hidden';
      }, 2000);
  }


  const [soundIcon, setSoundIcon] = useState(null);
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    const soundIconElement = document.querySelector('.sound--icon');
    setSoundIcon(soundIconElement);
  }, []);

  useEffect(() => {
    if (soundIcon) {
      soundIcon.addEventListener('click', () => {
        setIsSoundOn(!isSoundOn);
        if (isSoundOn) {
          soundIcon.src = process.env.PUBLIC_URL + '/img/sound-off.svg'; // Replace with the path to your sound on icon
          if (!audio.paused) {
            audio.pause();
          }
        } else {
          soundIcon.src = process.env.PUBLIC_URL + '/img/sound-on.svg'; // Replace with the path to your sound off icon
          audio.loop = true;
          if (audio.paused) {
            audio.play();
          }
        }
      });
    }
  }, [soundIcon, isSoundOn]);

  return (
    <div className="App">
      <div className="grid--lines" />
      <Header />
      <img className="sound--icon" src={process.env.PUBLIC_URL + '/img/sound-off.svg'} alt="Sound Icon" />
      {travelLogs}
    </div>
  );
}

export default App;