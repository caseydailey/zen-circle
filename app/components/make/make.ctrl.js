"use strict";



app.controller('MakeCtrl', function($scope, MakeFactory) {
        
        let s = $scope;

        s.character = MakeFactory.getCharacter();
        console.log(s.character);

        s.write = function(character){
        	console.log(character);
        	s.character = character;
        };

    });

