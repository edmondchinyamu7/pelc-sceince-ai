/* PELC Science AI — YouTube Video Library
   Works without a YouTube API key.
*/

function searchYouTube(inputId) {
  const input = document.getElementById(inputId);

  if (!input) {
    console.error("PELC: Search input not found.");
    return;
  }

  const query = input.value.trim();

  if (!query) {
    input.focus();
    input.placeholder = "Enter a topic to search...";
    return;
  }

  const searchUrl =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(query + " science tutorial");

  window.open(searchUrl, "_blank", "noopener,noreferrer");
}

function playYouTubeVideo(videoId, playerId) {
  const player = document.getElementById(playerId);

  if (!player || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    console.error("PELC: Invalid video ID or player.");
    return;
  }

  player.innerHTML = "";

  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube-nocookie.com/embed/" + videoId;
  iframe.title = "PELC Science AI YouTube tutorial";
  iframe.width = "100%";
  iframe.height = "315";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";

  player.appendChild(iframe);
}