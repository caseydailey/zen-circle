"use strict";

app.factory("APIfactory", function($q, $http){

	let translate = function(APIcreds, word) {
			return $q((resolve, reject) => {
	$http.get(`https://translation.googleapis.com/language/translate/v2?key=${APIcreds.key}&source=en&target=ja&q=${word}`)
		 .then((data)=> {
		 	var japanese = data.data.data.translations[0].translatedText;
		 	console.log("japanese: ", japanese);
		 	resolve(japanese);
		 });
	  });
	
	};


	return {translate};

});

//https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY&source=en&target=de&q=Hello%20world&q=My%20name%20is%20Jeff