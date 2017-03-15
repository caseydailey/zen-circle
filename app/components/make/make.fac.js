"use strict";

app.factory('MakeFactory', function($window, $location){

	var makeCharacter = [];

	let setCharacter = function(character){
		makeCharacter.push(character);
	};
	
	let getCharacter = function(character){
		return {makeCharacter};
	};

	return{getCharacter, setCharacter};

});