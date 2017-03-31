"use strict";

app.factory('MakeFactory', function($window, $location, $http, $q, DBcreds){

	var makeCharacter = [];
	var drawingObj;
	var editDrawing;
	var word;

	//getters and setters
	let setWord = (w) => word = w;
	let getWord = () => word;
	let setCharacter = (character) => makeCharacter.push(character[0]);
	let getCharacter = (character) => makeCharacter;
	let getDrawingObj =() => drawingObj;
	let getDrawing = () => editDrawing;
	let setDrawing = (drawingobj) => {
		drawingObj = drawingobj;
		editDrawing = drawingobj.drawing;
	};


	//save, update, delete
	let save = (drawing) => {
		return $q((resolve, reject) => {
				$http.post(`${DBcreds.databaseURL}/drawings.json`,
				angular.toJson(drawing))
				.then((result) => { resolve(result); })
				.catch((error) => { reject(error);   });
			});//end $q
			};//end save

	let deleteDrawing = (drawingID) => {
		return $q((resolve, reject) => {
			$http.delete(`${DBcreds.databaseURL}/drawings/${drawingID}.json`);
		});//end $q
		};//end deletDrawing

	let patchDrawing = (drawingObj) => {
		return $q((resolve, reject)=>{
			$http.patch(`${DBcreds.databaseURL}/drawings/${drawingObj.drawingID}.json`,
			angular.toJson(drawingObj));
		}); //end $q
		}; //end patchDrawing

	return {

		   getCharacter,
		   setCharacter,
		   save, 
		   setDrawing, 
		   getDrawing, 
		   deleteDrawing, 
		   getDrawingObj, 
		   setWord, 
		   getWord, 
		   patchDrawing
		};

});