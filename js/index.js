const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const songTitle = document.getElementById("song-title");
const songImage = document.getElementById("song-image");

const songs = [
    { name: "song1.mp3", image: "images/song1.jpg" },
    { name: "song2.mp3", image: "images/song2.jpg" },
    { name: "song3.mp3", image: "images/song3.jpg" }
];

let songIndex = 0;

// Load song function
function loadSong(song) {
    audio.src = `songs/${song.name}`;
    songTitle.textContent = song.name.replace(".mp3", "");
    songImage.src = song.image;
}

// Load the first song
loadSong(songs[songIndex]);

// Play/Pause button
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

// Next Song
nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.textContent = "⏸";
});

// Previous Song
prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.textContent = "⏸";
});

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

// Seek Song
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Auto-play Next Song
audio.addEventListener("ended", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
});
