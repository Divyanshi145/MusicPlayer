document.getElementById("playButton").addEventListener("click", PlayPause);
document.getElementById("nextButton").addEventListener("click",nextSong) ; 
document.getElementById("prevButton").addEventListener("click",prevSong) ;
let icon = document.getElementById("playIcon");
let song = document.getElementById("audio1");
song.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(song.duration);
});

song.addEventListener("timeupdate", updateProgressBar);

let progressBar = document.querySelector(".progress-bar");

progressBar.addEventListener("click", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  song.currentTime = percent * song.duration;
});

const songs = [
  {
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    src: "resources/lost-in-city-lights-145038.mp3",
    img: "resources/cover-1.jpg",
  },
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    src: "resources/forest-lullaby-110624.mp3",
    img: "resources/cover-2.jpg",
  },
];

let Cov = document.getElementById("cover") ;
let Title = document.getElementById("title") ;
let Author = document.getElementById("author") ;

let progressFilled = document.querySelector(".progress-filled");
let currentTimeEl = document.querySelector(".current-time");
let totalTimeEl = document.querySelector(".total-time");

let isPlaying = false;
let currentSongIndex = 0;

function PlayPause() {
    
    if (isPlaying) {
        song.pause();
        icon.src = "resources/play.svg";

    }
    else {
        song.play();
        icon.src = "resources/pause.svg"

    }
    isPlaying = !isPlaying;
}

function loadSong(index) {
  const obj = songs[index];
  song.src = obj.src;
  Cov.src = obj.img;
  Title.textContent = obj.title;
  Author.textContent = obj.author;
  icon.src = "resources/play.svg";
  progressFilled.style.width = "0%";
  currentTimeEl.textContent = "00:00";
  isPlaying = false;
}
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function updateProgressBar() {
  const percent = (song.currentTime / song.duration) * 100;
  progressFilled.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(song.currentTime);
}



