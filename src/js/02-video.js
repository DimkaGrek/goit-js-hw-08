import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const saveToStorage = throttle(seconds => {
  localStorage.setItem('videoplayer-current-time', seconds);
}, 1000);

function onPlay(data) {
  saveToStorage(data.seconds);
}

player.on('timeupdate', onPlay);

window.onload = () => {
  const lastPlayedTime = localStorage.getItem('videoplayer-current-time');
  if (lastPlayedTime) {
    player
      .setCurrentTime(lastPlayedTime)
      .then(function (seconds) {
        console.log('Time install successful');
      })
      .catch(function (error) {
        console.log('Error install time');
      });
  }
};
