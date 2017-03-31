"use strict";

app.factory('HomeFactory', function($q, $http, DBcreds, AuthFactory){
	var myDrawings = [];

	let searchFilter = function(){
		return {
			search: ""
		};
	};
	
//helper for getDrawings below iterates through data and assigns ids	
	let assignIDs = function(drawings){
		let drawingsData = drawings.data;
		myDrawings = [];
		console.log('myDrawings line 9:', myDrawings);
		Object.keys(drawingsData).forEach((drawing)=> {
			drawingsData[drawing].drawingID = drawing;
			myDrawings.push(drawingsData[drawing]);
		});
	};

		//gets the user drawing back from FB, assigning IDs from FB
		let getDrawings = (userID) => {
			return $q((resolve, reject) => {
				$http.get(`${DBcreds.databaseURL}/drawings.json?orderBy="uid"&equalTo="${userID}"`)
				.then((drawings) => {
					assignIDs(drawings);
			        console.log('myDrawings line 22:', myDrawings);
			        // Promise.race(myDrawings);
			        resolve(myDrawings);
				})
				.catch((error) => {
					reject(error);
				});
			});
		};

		// let pinsArray = returnedPins.data;
				// let pins = [];
				// Object.keys(pinsArray).forEach((each) => {
				// 	pinsArray[each].id = each;
				// 	pins.push(pinsArray[each]);


		// //gets an actual drawing based on a key
		// let getDrawing = (userID, drawingID)=> {
		// 	return $q((resolve, reject)=>{
		// 		$http.get(`${DBcreds.databaseURL}/users/${userID}/${drawingID}.json`)
		// 		.then((drawing)=>{
		// 			console.log(drawing);
		// 			resolve(drawing);
		// 		})
		// 		.catch((error)=> {
		// 			reject(error);
		// 		});
		// 	});
		// };

	return{getDrawings, searchFilter};

});