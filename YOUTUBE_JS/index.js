
import {
  trendingVideosUrl,
  searchVideoUrl
} from "./util.js";
import {generateSuggestions,handleSuggestionsClick,debounce} from ".././AUTOCORRECTION_AUTOSUGGESTION/index.js";

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
      const imageSrc=video.image;
      videoContainer.innerHTML = `
                <div class="image_container">
                <img src=${imageSrc} alt=Video_thumbnail />
                </div>
                <div class="text_container">
                    <h4>${video.name}</h4>
                    <h6>${video.cuisine}</h6>
                </div>
            `;
      videos.appendChild(videoContainer);
    });
  }
};

let trendingVideos=[];

async function showTrendingVideos() {
  trendingVideos = await getTrendingVideos();
  const videos = document.getElementById("videos");
  generateCard(trendingVideos, videos);
}

document.addEventListener("DOMContentLoaded", showTrendingVideos);

const searchBar = document.getElementsByClassName("search_input")[0];
searchBar.addEventListener("keyup", (e) => handleSearch(e));

let thisCalled=0;
async function getSearchedVideos(searchValue) {
  const data = await fetch(searchVideoUrl + searchValue);
  const searchedVideosOnbj = await data.json();
  const searchedVideos = searchedVideosOnbj?.recipes;
  const suggestionsContainer=document.getElementById("suggestions");
  generateSuggestions(searchedVideos,suggestionsContainer);
  if(thisCalled>0) {
    suggestionsContainer.removeEventListener('click',handleSuggestionsClick);
  }
 suggestionsContainer.addEventListener('click',(e)=> {
  const searchVal=handleSuggestionsClick(e,"search_input","suggestions","videos")
  const index=trendingVideos.findIndex((ele)=>ele.name===searchVal);
  generateCard([trendingVideos[index]],document.getElementById("videos"));
  const backButton=document.getElementById("back_button");
  backButton.style.display="inline-block";
  backButton.addEventListener('click',(e)=>{
    const videosContainer=document.getElementById("videos");
    videosContainer.innerHTML="";
    generateCard(trendingVideos,videosContainer);
    const inputBar = document.getElementsByClassName(
      "search_input"
    )[0];
    inputBar.value="";
  })
});
  thisCalled++;
}

const debouncedSearch = debounce(getSearchedVideos, 500);

async function handleSearch(e) {
  const searchValue = e.target.value;
  debouncedSearch(searchValue);
}


