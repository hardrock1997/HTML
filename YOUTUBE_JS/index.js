import { trendingVideosUrl, searchVideoUrl } from "./util.js";
import {
  generateSuggestions,
  handleSuggestionsClick,
  debounce,
} from ".././AUTOCORRECTION_AUTOSUGGESTION/index.js";

async function getTrendingVideos() {
  try {
    const videos = document.getElementById("videos");
    videos.innerHTML = `<h1>Loading...</h1>`;
    const data = await fetch(trendingVideosUrl);
    const trendingVideos = await data.json();
    videos.innerHTML = ``;
    return trendingVideos?.recipes;
  } catch {
    const videos = document.getElementById("videos");
    videos.innerHTML = `<h1>Error Fetching the Trending Videos</h1>`;
  }
}

const generateCard = (trendingVideos, videos) => {
  if (trendingVideos && trendingVideos.length > 0) {
    trendingVideos.forEach((video) => {
      const videoContainer = document.createElement("div");
      videoContainer.setAttribute("class", "video_container");
      videoContainer.setAttribute("id", video.id);
      const imageSrc = video?.image;
      videoContainer.innerHTML = `
                <div class="image_container id=${video.id}">
                <img src=${imageSrc} alt=Video_thumbnail />
                </div>
                <div class="text_container id=${video.id}">
                    <h4>${video?.name}</h4>
                    <h6>${video?.cuisine}</h6>
                </div>
              </d>
            `;
      videos.appendChild(videoContainer);
    });
  }
};

let trendingVideos = [];

async function getAVideo(id) {
  const data = id && (await fetch(`https://dummyjson.com/recipes/${id}`));
  const videoData = await data.json();
  return videoData;
}

function handleBack(iframeBody, iframe, url) {
  iframeBody.innerHTML = "";
  iframe.style.display = "none";
  showTrendingVideos();
  window.location.href = url.split("?")[0];
}

function appendBackButton(iframeBody, iframe, url) {
  const backButton = document.createElement("button");
  backButton.addEventListener("click", () =>
    handleBack(iframeBody, iframe, url)
  );
  window.addEventListener("popstate", () =>
    handleBack(iframeBody, iframe, url)
  );
  backButton.innerText = "Back";
  iframeBody.appendChild(backButton);
  return;
}

function setStylesForIframe(iframe, iframeBody) {
  iframe.style.display = "block";
  const textContainer = iframeBody.children[0].children[1];
  const imageContainer = iframeBody.children[0].children[0];
  const image = imageContainer.children[0];
  image.style.width = "100%";
  image.style.height = "100%";
  image.style.objectFit = "cover";
  textContainer.style.textAlign = "center";
}

async function handleVideoClick(e) {
  const videos = document.getElementById("videos");
  const clickedVideoCard = document.getElementById(
    e.target?.classList[1]?.split("=")[1]
  );
  const videoData = await getAVideo(clickedVideoCard.getAttribute("id"));
  let clickedVideo = e.target.innerText.split("/n")[0].split("\n")[0];
  clickedVideo = clickedVideo.replaceAll(" ", "");
  const url = window.location.href + `?q=${clickedVideo}`;
  history.pushState({ page: "individualRecipe" }, "", url);
  const iframe = document.getElementById("myIframe");
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const iframeBody = iframeDoc.body;
    generateCard([videoData], iframeBody);
    appendBackButton(iframeBody, iframe, url);
    videos.innerHTML = "";
    setStylesForIframe(iframe, iframeBody);
  } catch (error) {
    console.error("Cannot access iframe content:", error);
  }
}

async function showTrendingVideos() {
  trendingVideos = await getTrendingVideos();
  const videos = document.getElementById("videos");
  videos.addEventListener("click", handleVideoClick);
  generateCard(trendingVideos, videos);
}

document.addEventListener("DOMContentLoaded", showTrendingVideos);

const searchBar = document.getElementsByClassName("search_input")[0];
searchBar.addEventListener("keyup", (e) => handleSearch(e));

let thisCalled = 0;
async function getSearchedVideos(searchValue) {
  const data = await fetch(searchVideoUrl + searchValue);
  const searchedVideosOnbj = await data.json();
  const searchedVideos = searchedVideosOnbj?.recipes;
  const suggestionsContainer = document.getElementById("suggestions");
  let historySuggestions = localStorage.getItem("history");
  historySuggestions = JSON.parse(historySuggestions);

  generateSuggestions(searchedVideos, suggestionsContainer, historySuggestions);
  if (thisCalled > 0) {
    suggestionsContainer.removeEventListener("click", handleSuggestionsClick);
  }
  suggestionsContainer.addEventListener("click", (e) => {
    let searchVal = handleSuggestionsClick(
      e,
      "search_input",
      "suggestions",
      "videos"
    );

    if (historySuggestions) {
      try {
        historySuggestions = JSON.parse(historySuggestions);
        if (!Array.isArray(historySuggestions)) {
          historySuggestions = [];
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        historySuggestions = [];
      }
    } else {
      historySuggestions = [];
    }

    historySuggestions.push(searchVal);

    localStorage.setItem("history", JSON.stringify(historySuggestions));
    const index = trendingVideos.findIndex((ele) => ele.name === searchVal);
    searchVal = searchVal.replaceAll(" ", "");
    const url = window.location.href + `?q=${searchVal}`;
    history.pushState({ page: "individualRecipe" }, "", url);
    generateCard([trendingVideos[index]], document.getElementById("videos"));
    const backButton = document.getElementById("back_button");
    backButton.style.display = "inline-block";
    backButton.addEventListener("click", (e) => {
      window.location.href = url.split("?")[0];
      const videosContainer = document.getElementById("videos");
      videosContainer.innerHTML = "";
      generateCard(trendingVideos, videosContainer);
      const inputBar = document.getElementsByClassName("search_input")[0];
      inputBar.value = "";
    });
  });
  thisCalled++;
}

const debouncedSearch = debounce(getSearchedVideos, 500);

async function handleSearch(e) {
  const searchValue = e.target.value;
  debouncedSearch(searchValue);
}
