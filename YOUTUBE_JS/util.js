export const trendingVideosUrl='https://youtube138.p.rapidapi.com/v2/trending';
export const trendingVideosOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ffb90a57ecmshbbfee4188ea7addp1bef64jsn966db67a9961',
		'x-rapidapi-host': 'youtube138.p.rapidapi.com'
	}
};

export const searchVideoUrl=`https://youtube138.p.rapidapi.com/search/?&hl=en&gl=US&q=`;
export const searchVideosOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ffb90a57ecmshbbfee4188ea7addp1bef64jsn966db67a9961',
		'x-rapidapi-host': 'youtube138.p.rapidapi.com'
	}
};


// // wrapping inside th Promise object as the setTimeout cannot return any value and we need the returned value by getSearchedVideos
// return new Promise((resolve, reject) => {
// 	clearTimeout(timer);
// 	timer = setTimeout(async () => {
// 	  try {
// 		// const result = await fn.apply(this, args);
// 		// need to understand the this keywork first
// 		const result = await fn(args[0]);
// 		resolve(result);
// 	  } catch (error) {
// 		reject(error);
// 	  }
// 	}, delay);
//   });
