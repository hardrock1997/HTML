import {
  trendingVideosUrl,
  trendingVideosOptions,
  searchVideoUrl,
  searchVideosOptions,
} from "./util.js";

async function getTrendingVideos() {
  try {
    const videos = document.getElementById("videos");
    videos.innerHTML = `<h1>Loading...</h1>`;
    const data = await fetch(trendingVideosUrl, trendingVideosOptions);
    const trendingVideos = await data.json();
    videos.innerHTML = ``;
    return trendingVideos?.list;
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
      const imageSrc = video?.videoThumbnails[0]?.url ? video?.videoThumbnails[0]?.url : video?.thumbnails[0]?.url
      videoContainer.innerHTML = `
                <div class="image_container">
                <img src=${imageSrc} alt=Video_thumbnail />
                </div>
                <div class="text_container">
                    <h4>${video.title}</h4>
                    <h6>${video.viewCountText}</h6>
                </div>
            `;
      videos.appendChild(videoContainer);
    });
  }
};

async function showTrendingVideos() {
  const trendingVideos = await getTrendingVideos();
  const videos = document.getElementById("videos");
  console.log(trendingVideos,'trendingVideos')
  generateCard(trendingVideos, videos);
}

document.addEventListener("DOMContentLoaded", showTrendingVideos);

async function getSearchedVideos(searchValue) {
  const data = await fetch(searchVideoUrl + searchValue, searchVideosOptions);
  const searchedVideos = await data.json();

  return searchedVideos?.contents;
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    // wrapping inside th Promise object as the setTimeout cannot return any value and we need the returned value by getSearchedVideos
    return new Promise((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          // const result = await fn.apply(this, args);
          // need to understand the this keywork first
          const result = await fn(args[0]);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

const debouncedSearch = debounce(getSearchedVideos, 500);

async function handleSearch(e) {
  const searchValue = e.target.value;
  const searchedVideos = await debouncedSearch(searchValue);
  const videos = document.getElementById("videos");
  videos.innerHTML='';
  console.log(searchedVideos, "searchedVideos");
  generateCard(searchedVideos,videos)
}

const searchBar = document.getElementsByClassName("search_input")[0];
searchBar.addEventListener("keyup", (e) => handleSearch(e));
