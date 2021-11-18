// 1/* Get out Elements *
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions
// function togglePlay() {
//   if (video.paused) {
//     video.play();
//   } else {
//     video.pause();
//   }
// }

// alternative
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButtons() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  // parseFloat as the value for skip is either 10s or 25s which is a string in the index.html
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(this.name);
  console.log(this.value);
  // both name and vlaue will now update simultaneously
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  // e.ofsetx = the postion of video on the bar / totalwidth of bar * the duration
  // gives you the exact time on the bar= video will then run from that point onward
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}
// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButtons);
video.addEventListener('pause', updateButtons);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

// click and scroll across capabillity
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

