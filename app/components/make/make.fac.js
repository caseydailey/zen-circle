"use strict";

app.factory('MakeFactory', function($window, $location, $http, $q, DBcreds){

	var makeCharacter = [];
	var drawingObj;
	var editDrawing;

//getters and setters
	let setCharacter = function(character){
		makeCharacter.push(character[0]);
	};
	
	let getCharacter = function(character){
		return makeCharacter;
	};

	let setDrawing = function(drawingobj){
		drawingObj = drawingobj;
		editDrawing = drawingobj.drawing;
	};

	let getDrawingObj = function(){
		return drawingObj;
	};

	let getDrawing = function(){
		console.log('returning this from make.fac:', editDrawing);
		return editDrawing;
	};

//save, update, delete

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

	let deleteDrawing = function(drawingID) {
		return $q((resolve, reject) => {
			$http.delete(`${DBcreds.databaseURL}/drawings/${drawingID}.json`);
		});
	};

	let patchDrawing = function(drawingID, drawing){
		return $q((resolve, reject)=>{
			$http.patch(`${DBcreds.databaseURL}/drawings/${drawingID}.json`,
				angular.toJson(drawing));
		});
	};

	return{getCharacter, setCharacter, save, setDrawing, getDrawing, deleteDrawing, getDrawingObj};

});