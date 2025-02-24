export const autoSuggestionsUrl=
'https://dummyjson.com/recipes/search?q='
// "https://web-search-autocomplete.p.rapidapi.com/autocomplete?language=en&region=us&user_agent=desktop&query=";

//  export const autoSuggestionsUrlOptions = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '66338b32a5msh2459e96ed8d139ep1ddd80jsn2df0d3aa3d94',
// 		'x-rapidapi-host': 'web-search-autocomplete.p.rapidapi.com'
// 	}
// };

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