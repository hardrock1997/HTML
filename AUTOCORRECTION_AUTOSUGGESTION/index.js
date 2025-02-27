import {
  autoCompleteUrl,
  autoCompleteOptions,
  autoSuggestionsUrl,
} from "./utils.js";

export function suggestionsHelper(suggestions, suggestionsContainer) {
  suggestionsContainer.innerHTML = "";
  if (suggestions.length === 0) {
    return;
  }
  suggestionsContainer.innerHTML = "";
  suggestionsContainer.style.display = "flex";
  suggestionsContainer.style.flexDirection = "column";
  const heading = document.createElement("h2");
  heading.innerText = "Suggestions";
  heading.style.color = "white";
  heading.style.textAlign = "center";
  suggestionsContainer.appendChild(heading);
  const suggs = suggestions?.filter((_, i) => i < 3);
  suggs?.forEach((sugg, i) => {
    const sug = document.createElement("h4");
    sug.style.color = "white";
    sug.style.textAlign = "center";
    sug.setAttribute("id", i + 1);
    sug.setAttribute("tabindex", "0");
    sug.innerText = sugg.name;
    suggestionsContainer.appendChild(sug);
  });
}

export function completionsHelper(completions, suggestionsContainer) {
  console.log(completions, "completions");
  if (completions.length === 0) {
    return;
  }
  const heading2 = document.createElement("h2");
  heading2.textContent = "Last suggestion selected";
  heading2.style.color = "white";
  heading2.style.textAlign = "center";
  suggestionsContainer.appendChild(heading2);
  completions.forEach((com, i) => {
    console.log(com, "COM");
    const cmp = document.createElement("h4");
    cmp.style.color = "white";
    cmp.style.textAlign = "center";
    cmp.setAttribute("id", i + 1);
    cmp.setAttribute("tabindex", "0");
    cmp.innerText = com;
    suggestionsContainer.appendChild(cmp);
  });
}

export function generateSuggestions(
  suggestions = [],
  suggestionsContainer,
  completions = []
) {
  if (suggestions) suggestionsHelper(suggestions, suggestionsContainer);
  if (completions) completionsHelper(completions, suggestionsContainer);
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

export function handleSuggestionsClick(e, className = "", id = "", videosId) {
  const target = e.target;
  const suggestion = document.getElementById(target.id);
  const inputBar = document.getElementsByClassName(className)[0];
  const suggestionsContainer = document.getElementById(id);
  const videosContainer = document.getElementById(videosId);
  if (suggestion) {
    inputBar.value = suggestion?.innerText;
    suggestionsContainer.style.display = "none";
    videosContainer.innerHTML = "";
    return inputBar.value;
  }
}

let thisCalled = 0;
async function getAutoCompleteSuggestions(inputValue) {
  const suggestionsContainer = document.getElementsByClassName(
    "auto_suggestions_correction"
  )[0];
  if (inputValue === "") {
    suggestionsContainer.style.display = "none";
  } else {
    let x1 = Date.now();
    suggestionsContainer.style.display = "flex";
    autoCompleteOptions.body = JSON.stringify({
      text: inputValue,
      language: "en",
    });
    const [suggestionsData, completionsData] = await Promise.all([
      fetch(autoSuggestionsUrl + inputValue),
      fetch(autoCompleteUrl, autoCompleteOptions),
    ]);
    const suggestions = await suggestionsData.json();
    const completions = await completionsData.text();
    let x2 = Date.now();
    handleLoadingBar(x2 - x1);
    const suggestionsResponse = suggestions?.recipes;
    const predectionsResponse = JSON.parse(completions).predictions;
    if (suggestionsResponse?.length === 0 && predectionsResponse.length === 0) {
      suggestionsContainer.style.display = "none";
      return;
    }
    suggestionsContainer.style.backgroundColor = "black";
    suggestionsContainer.style.border = "1px solid black";
    suggestionsContainer.style.borderRadius = "20px";
    generateSuggestions(
      suggestionsResponse,
      suggestionsContainer,
      predectionsResponse
    );
    if (thisCalled > 0) {
      suggestionsContainer.removeEventListener("click", handleSuggestionsClick);
    } else
      suggestionsContainer.addEventListener("click", (e) =>
        handleSuggestionsClick(e, "input_bar", "auto_suggestions_correction")
      );
    thisCalled++;
  }
}

export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const debouncedFn = debounce(getAutoCompleteSuggestions, 300);

async function handleInputBar(e, debouncedFn) {
  const inputValue = e.target.value;
  const suggestionsContainer = document.getElementsByClassName(
    "auto_suggestions_correction"
  )[0];
  if (inputValue === "") {
    suggestionsContainer.style.display = "none";
    return;
  }
  debouncedFn(inputValue);
}

document.addEventListener("DOMContentLoaded", () => {
  const inputBar = document.getElementById("input_bar");
  inputBar?.addEventListener("keyup", (e) => handleInputBar(e, debouncedFn));
});
