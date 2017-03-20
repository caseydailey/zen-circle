"use strict";

app.factory('MakeFactory', function($window, $location, $http, $q, DBcreds){

	var makeCharacter = [];
	var editDrawing;

	let setCharacter = function(character){
		console.log('character in makeFactory:', character);
		makeCharacter.push(character[0]);
	};
	
	let getCharacter = function(character){
		return makeCharacter;
	};

	let setDrawing = function(drawingobj){
		editDrawing = drawingobj.drawing;
		console.log('editDrawing:', editDrawing);
	};

	let getDrawing = function(){
		console.log('returning this from make.fac:', editDrawing);
		return editDrawing;
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


	return{getCharacter, setCharacter, save, setDrawing, getDrawing};

});