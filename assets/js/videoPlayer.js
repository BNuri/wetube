import axios from "axios";

const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer;

function init() {
  videoPlayer = videoContainer.querySelector("video");
}

if (videoContainer) {
  init();
}

const registerView = () => {
  const videoId = window.location.href.split("./videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
};
