"use strict";

app.controller('FindCtrl', function($scope, $window, $location, APIfactory, APIcreds, MakeFactory) {

	let s = $scope;
	
	//make the call, split the resolve to handle case where jap.length is >1, and send to display
	s.googleIt = function(APIcreds, word) {
		APIfactory.translate(APIcreds, word)
		.then((japanese)=> {
			 let japaneseArray = japanese.split("");
			  s.display(japaneseArray);			
		});	
 };		
	
	//the handler for the enter key in the input get the word(s) and passes them to googleIt().
	s.enter = function($event){
		if($event.keyCode == 13){
		  let word = $event.target.value;
		  s.googleIt(APIcreds, word);
		  $event.target.value = "";
		}
	};

	//takes the split from googleIt and maps it to scope
	s.display = function(japaneseArray){
			s.japanese =[];
			japaneseArray.map((char)=> s.japanese.push(char));
			console.log('s.japanese:', s.japanese);
	// 		var canvas = document.getElementById('canvas');
	// 		var ctx = canvas.getContext('2d');
	// 		ctx.font = "300px serif";
	// 		ctx.textAlign="center";
	// 		ctx.strokeText(s.japanese [0], 200, 300);
	// 		s.character = canvas.toDataURL();
	};



	//when character is clicked, redirect to make mode
	s.make = function(character) {
		MakeFactory.setCharacter(character);
		$window.location.href = '#!/make';
	};


});