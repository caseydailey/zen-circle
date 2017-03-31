"use strict";

app.controller('HomeCtrl', function($scope, $timeout, $window, $location, AuthFactory, HomeFactory, MakeFactory, ngToast) {
      
      //bind scope and initialize canvas variable 
        let s = $scope;
        let canvas = null;
      //get user search text. initialize paths, and set a few flags on the DOM for display handling
        s.userObj = AuthFactory.getUserObj();
        s.searchText = HomeFactory.searchFilter();
        s.paths = [];
        s.hover=false;
        s.showSearch = false;
        s.deleting = false;

        //hides search input after enter key pressed and resets the search
        s.hideSearch = function($event){
          console.log('s.searchText.search:', s.searchText.search);
            if($event.keyCode == 13){
            s.showSearch = false;
            s.searchText.search = "";
          }
        };

        

        //returns an array of ids
        HomeFactory.getDrawings(s.userObj.uid)
        	.then((myDrawings)=>{
                s.paths = [];
                myDrawings.forEach((drawing)=>{
                s.paths.push(drawing);
          });
        });

          //takes drawing object and updates the model with setDrawing and routes to edit
          s.edit = function(drawing){
            MakeFactory.setDrawing(drawing);
            $window.location.href = '#!/edit';
          };

          //selects an element andbased on drawing and removes its parent with a little jqlite
          s.deleteDrawing = function(drawingID) {
            MakeFactory.deleteDrawing(drawingID);
            angular.element(`#${drawingID}`)
                   .parent()
                   .remove();
          };

          //creates a toast withngToastprovider which timesout in 2 secs and can be clicked to dismiss dismissal calls delete
          s.deleteMessage = function(drawingID) {
            ngToast.create({  
            content: 'Drawing Deleted.',
            timeout: 2000,
            dismissButton: true,
            dismissButtonHtml: `&times;`,
            onDismiss: s.deleteDrawing(drawingID)
          });
        };
	
});