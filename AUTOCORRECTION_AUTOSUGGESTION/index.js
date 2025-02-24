import {
  autoCompleteUrl,
  autoCompleteOptions,
  // autoSuggestionsUrlOptions,
  autoSuggestionsUrl,
} from "./utils.js";

function suggestionsHelper(suggestions, suggestionsContainer) {
  suggestionsContainer.innerHTML = "";
  if(suggestions.length===0) {
    return;
  }
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
    sug.innerText = sugg.name;
    suggestionsContainer.appendChild(sug);
  });
}

function completionsHelper(completions, suggestionsContainer) {
  if(completions.length===0) {
    return;
  }
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

let timesCalled=0;
function handleSuggestionsClick(e) {
    const target=e.target;
    const suggestion=document.getElementById(target.id);
    if(suggestion) {
      if(timesCalled%2===0) {
        suggestion.style.backgroundColor="red";
      }
      else {
        suggestion.style.backgroundColor="";
      }
      timesCalled++;
    }
  
    
}

let thisCalled=0;
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
    const suggestionsResponse=suggestions?.recipes
    const predectionsResponse=JSON.parse(completions).predictions
    if(suggestionsResponse?.length===0 && predectionsResponse.length===0) {
      suggestionsContainer.style.display="none";
      return;
    }
    suggestionsContainer.style.backgroundColor = "black";
    suggestionsContainer.style.border="1px solid black";
    suggestionsContainer.style.borderRadius="20px";
    generateSuggestions(
      suggestionsResponse,
      suggestionsContainer,
      predectionsResponse
    );
    if(thisCalled>0) {
      suggestionsContainer.removeEventListener('click',handleSuggestionsClick);
    }
    else suggestionsContainer.addEventListener('click',(e)=>handleSuggestionsClick(e));
    thisCalled++;
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
  const suggestionsContainer = document.getElementsByClassName(
    "auto_suggestions_correction"
  )[0];
  if(inputValue==="") {
    suggestionsContainer.style.display="none";
    return;
  }
  debouncedFn(inputValue);
}

document.addEventListener("DOMContentLoaded", () => {
  const inputBar = document.getElementById("input_bar");
  inputBar.addEventListener("keyup", handleInputBar);
});
