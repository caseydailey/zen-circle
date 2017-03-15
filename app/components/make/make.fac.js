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

	return{getCharacter, setCharacter};

});