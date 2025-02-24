export const autoSuggestionsUrl=
'https://dummyjson.com/recipes/search?q='

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