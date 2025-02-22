import {
  autoCompleteUrl,
  autoCompleteOptions,
  autoSuggestionsUrlOptions,
  autoSuggestionsUrl,
} from "./utils.js";

function suggestionsHelper(suggestions, suggestionsContainer) {
  suggestionsContainer.innerHTML = "";
  const heading = document.createElement("h2");
  heading.innerText = "Suggestions";
  heading.style.color = "white";
  heading.style.textAlign = "center";
  suggestionsContainer.appendChild(heading);
  const suggs = suggestions?.filter((_, i) => i < 3);
  suggs?.forEach((sugg,i) => {
    const sug = document.createElement("h4");
    sug.style.color = "white";
    sug.style.textAlign = "center";
    sug.setAttribute('id',i+1);
    sug.setAttribute('tabindex',"0");
    sug.innerText = sugg.query;
    suggestionsContainer.appendChild(sug);
  });
}

function completionsHelper(completions, suggestionsContainer) {
  const heading2 = document.createElement("h2");
  heading2.textContent = "Completions";
  heading2.style.color = "white";
  heading2.style.textAlign = "center";
  suggestionsContainer.appendChild(heading2);
  completions.forEach((com,i) => {
    const cmp = document.createElement("h4");
    cmp.style.color = "white";
    cmp.style.textAlign = "center";
    cmp.setAttribute('id',i+1);
    cmp.setAttribute('tabindex',"0");
    cmp.innerText = com.text;
    suggestionsContainer.appendChild(cmp);
  });
}

function generateSuggestions(suggestions, suggestionsContainer, completions) {
  suggestionsHelper(suggestions, suggestionsContainer);
  completionsHelper(completions, suggestionsContainer);
}

function handleLoadingBar(delta) {
  const loadingBar = document.getElementById("loading_bar");
  loadingBar.style.display = "block";
  let timer = null;
  let co = 0;
  while (co < delta && co < 35) {
    loadingBar.style.width = `${co}%`;
    co++;
  }
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    loadingBar.style.display = "none";
  }, 1000);
}

function handleSuggestionsClick(e) {
    const target=e.target;
    console.log(e.key,target,"YESS")
}

async function getAutoCompleteSuggestions(inputValue) {
  const suggestionsContainer = document.getElementsByClassName(
    "auto_suggestions_correction"
  )[0];
  if (inputValue === "") {
    //clearing the UI if nothing is searched.
    suggestionsContainer.style.display = "none";
  } else {
    let x1 = Date.now();
    suggestionsContainer.style.display = "flex";
    autoCompleteOptions.body = JSON.stringify({
      text: inputValue,
      language: "en",
    });
    const [suggestionsData, completionsData] = await Promise.all([
      fetch(autoSuggestionsUrl + inputValue, autoSuggestionsUrlOptions),
      fetch(autoCompleteUrl, autoCompleteOptions),
    ]);
    const suggestions = await suggestionsData.json();
    const completions = await completionsData.text();
    let x2 = Date.now();
    handleLoadingBar(x2 - x1);
    suggestionsContainer.style.backgroundColor = "black";
    generateSuggestions(
      suggestions?.data,
      suggestionsContainer,
      JSON.parse(completions).predictions
    );

    // suggestionsContainer.addEventListener('keydown',(e)=>handleSuggestionsClick(e));
  }
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const debouncedFn = debounce(getAutoCompleteSuggestions, 300);

async function handleInputBar(e) {
  const inputValue = e.target.value;
  debouncedFn(inputValue);
}

document.addEventListener("DOMContentLoaded", () => {
  const suggestionsContainer = document.getElementsByClassName(
    "auto_suggestions_correction"
  )[0];
  const inputBar = document.getElementById("input_bar");
  // clearing the last suggestions and hiding the suggestionsContainer when the foucs is removed.
  inputBar.addEventListener("change", () => {
    const suggestionsContainer = document.getElementsByClassName(
      "auto_suggestions_correction"
    )[0];
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
  });
  inputBar.addEventListener("focus", handleInputBar);
  inputBar.addEventListener("keyup", handleInputBar);
});
