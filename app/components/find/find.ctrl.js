"use strict";

app.controller('FindCtrl', function($scope, $window, $location, APIfactory, APIcreds, MakeFactory) {

	let s = $scope;
	s.blank = true;
	
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
		s.word = word;
		$event.target.value = "";
		s.blank = false;
		}
	};

	//handy little helper
	s.clear = function(){
		$window.location.reload();
	};

	//takes the split from googleIt and maps it to scope
	s.display = function(japaneseArray){
		s.japanese =[];
		japaneseArray.map((char)=> s.japanese.push(char));
		// console.log('s.japanese:', s.japanese);
	};



	//when character is clicked, redirect to make mode
	s.make = function(character, word) {
		MakeFactory.setCharacter(character);
		MakeFactory.setWord(word);
		$window.location.href = '#!/make';
	};


});