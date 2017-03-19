"use strict";

app.factory('MakeFactory', function($window, $location, $http, $q, DBcreds){

	var makeCharacter = [];

	let setCharacter = function(character){
		console.log('character in makeFactory:', character);
		makeCharacter.push(character[0]);
	};
	
	let getCharacter = function(character){
		return makeCharacter;
	};

	let save = (drawing) => {
		return $q((resolve, reject) => {
				$http.post(`${DBcreds.databaseURL}/drawings.json`,
				angular.toJson(drawing))
				.then((result) => {
					console.log(result);
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
			});
		};


	return{getCharacter, setCharacter, save};

});