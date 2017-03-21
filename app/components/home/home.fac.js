"use strict";

app.factory('HomeFactory', function($q, $http, DBcreds, AuthFactory){
	var myDrawings = [];
	
	let assignIDs = function(drawings){
		let drawingsData = drawings.data;
		Object.keys(drawingsData).forEach((drawing)=> {
			drawingsData[drawing].drawingID = drawing;
			myDrawings.push(drawingsData[drawing]);
		});
	};

		//gets the ids of users drawings
		let getDrawings = (userID) => {
			return $q((resolve, reject) => {
				$http.get(`${DBcreds.databaseURL}/drawings.json?orderBy="uid"&equalTo="${userID}"`)
				.then((drawings) => {
					assignIDs(drawings);
			        console.log('myDrawings:', myDrawings);
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

	return{getDrawings};

});