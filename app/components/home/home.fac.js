"use strict";

app.factory('HomeFactory', function($q, $http, DBcreds, AuthFactory){

//will hold user drawings with ids	
	var myDrawings = [];

//model for home search
	let searchFilter = function(){
		return { search: ""};
	};
	
//helper for getDrawings below iterates through data and assigns ids	
	let assignIDs = function(drawings){
			let drawingsData = drawings.data;
			myDrawings = [];//clear previous array
			//set each key (firebase id) as drawingID prop and push to myDrawings array
			Object.keys(drawingsData).forEach((drawing)=> {
			drawingsData[drawing].drawingID = drawing;
			myDrawings.push(drawingsData[drawing]);
		});
	};

		//gets the user drawing back from FB, assigning IDs from FB
		let getDrawings = function(userID) {
			return $q((resolve, reject) => {
				$http.get(`${DBcreds.databaseURL}/drawings.json?orderBy="uid"&equalTo="${userID}"`)
				.then((drawings) => {
					assignIDs(drawings);
			        resolve(myDrawings);
				})
				.catch((error) => {
					reject(error);
				});
			});
		};

		

	return { getDrawings, 
			 searchFilter
		   };

});