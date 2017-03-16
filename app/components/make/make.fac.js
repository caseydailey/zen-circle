"use strict";

app.factory('MakeFactory', function($window, $location){

	var makeCharacter = [];

	let setCharacter = function(character){
		console.log('character in makeFactory:', character);
		makeCharacter.push(character[0]);
	};
	
	let getCharacter = function(character){
		return makeCharacter;
	};

	// // create a pin within the pins object on FB
	// 	let save = (drawing) => {
	// 		return $q((resolve, reject) => {
	// 			$http.post(`${FBCreds.databaseURL}/pins.json`,
	// 			angular.toJson(pinObj))
	// 			.then((result) => {
	// 				resolve(result);
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 			});
	// 		});
	// 	};


	return{getCharacter, setCharacter};

});