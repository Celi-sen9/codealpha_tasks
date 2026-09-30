const audioPlayer = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

const playlistItems = document.querySelectorAll(".playlist-item");


const songs = [
    {
        title: "Stay a Little Longer",
        artist: "RahulSapkal",
        file: "./music/song1.mp3"
    },
    {
        title: "Midnight Echo",
        artist: "RahulSapkal",
        file: "./music/song2.mp3"
    },
    {
        title: "Summer Rain",
        artist: "MoonpetalMedia",
        file: "./music/song3.mp3"
    }
];


let currentSongIndex = 0;


// LOAD SONG
function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;
    artistName.textContent = song.artist;

    audioPlayer.pause();

    audioPlayer.src = song.file;

    audioPlayer.load();

    progressBar.value = 0;

    currentTimeDisplay.textContent = "0:00";
    durationDisplay.textContent = "0:00";

    updatePlaylist();
}


// PLAY / PAUSE
playBtn.addEventListener("click", function () {

    if (audioPlayer.paused) {

        audioPlayer.play()
            .then(function () {
                playBtn.textContent = "❚❚";
            })
            .catch(function (error) {
                console.log("Audio error:", error);
                alert("The browser could not load the song.");
            });

    } else {

        audioPlayer.pause();

        playBtn.textContent = "▶";
    }

});


// NEXT
nextBtn.addEventListener("click", function () {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    audioPlayer.play()
        .then(function () {
            playBtn.textContent = "❚❚";
        });

});


// PREVIOUS
previousBtn.addEventListener("click", function () {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);

    audioPlayer.play()
        .then(function () {
            playBtn.textContent = "❚❚";
        });

});


// SONG DURATION
audioPlayer.addEventListener("loadedmetadata", function () {

    durationDisplay.textContent =
        formatTime(audioPlayer.duration);

});


// PROGRESS
audioPlayer.addEventListener("timeupdate", function () {

    if (!isNaN(audioPlayer.duration)) {

        const progress =
            (audioPlayer.currentTime / audioPlayer.duration) * 100;

        progressBar.value = progress;

        currentTimeDisplay.textContent =
            formatTime(audioPlayer.currentTime);
    }

});


// MOVE THROUGH SONG
progressBar.addEventListener("input", function () {

    if (audioPlayer.duration) {

        audioPlayer.currentTime =
            (progressBar.value / 100) *
            audioPlayer.duration;
    }

});


// VOLUME
volumeBar.addEventListener("input", function () {

    audioPlayer.volume = volumeBar.value;

});


// AUTOMATICALLY PLAY NEXT SONG
audioPlayer.addEventListener("ended", function () {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    audioPlayer.play()
        .then(function () {
            playBtn.textContent = "❚❚";
        });

});


// PLAYLIST
playlistItems.forEach(function (item) {

    item.addEventListener("click", function () {

        currentSongIndex =
            Number(item.dataset.index);

        loadSong(currentSongIndex);

        audioPlayer.play()
            .then(function () {
                playBtn.textContent = "❚❚";
            });

    });

});


// HIGHLIGHT SONG
function updatePlaylist() {

    playlistItems.forEach(function (item, index) {

        if (index === currentSongIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });

}


// TIME FORMAT
function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secondsLeft = Math.floor(seconds % 60);

    return minutes + ":" +
        secondsLeft.toString().padStart(2, "0");
}


// INITIAL VOLUME
audioPlayer.volume = 1;


// LOAD FIRST SONG
loadSong(0);