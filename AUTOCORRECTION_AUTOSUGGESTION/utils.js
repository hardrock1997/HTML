export const autoSuggestionsUrl=
"https://web-search-autocomplete.p.rapidapi.com/autocomplete?language=en&region=us&user_agent=desktop&query=";

 export const autoSuggestionsUrlOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3d7bdfecdcmshda8a32f2a127f6dp10e1ddjsnae68667b2359',
		'x-rapidapi-host': 'web-search-autocomplete.p.rapidapi.com'
	}
};

export const autoCompleteUrl= 'https://typewise-ai.p.rapidapi.com/completion/sentence_complete';

export const autoCompleteOptions={
	method: 'POST',
	headers: {
		'x-rapidapi-key': '4d1676eea7msh7f92a522537049ap112219jsn846c19e504f7',
		'x-rapidapi-host': 'typewise-ai.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: {
		text: 'Kind r',
		language: 'en'
	}
};