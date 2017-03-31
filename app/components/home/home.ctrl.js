"use strict";

app.controller('HomeCtrl', function($scope, $timeout, $window, $location, AuthFactory, HomeFactory, MakeFactory, ngToast) {
       
        let s = $scope;
        s.userObj = AuthFactory.getUserObj();
        s.searchText = HomeFactory.searchFilter();
        let canvas = null;
        s.paths = [];
        s.hover=false;
        s.showSearch = false;
        s.deleting = false;

        s.hideSearch = function($event){
          console.log('s.searchText:', s.searchText);
            if($event.keyCode == 13){
            s.showSearch = false;
            s.searchText.search = "";
          }
        };

        // let callPrint = function(){
        //   console.log('callPrint fired');
        //   s.print(s.paths);
        // };

        //returns an array of ids
        HomeFactory.getDrawings(s.userObj.uid)
        	.then((myDrawings)=>{
                s.paths = [];
                myDrawings.forEach((drawing)=>{
                s.paths.push(drawing);
          });

            // $timeout(callPrint);
            
        });

          s.edit = function(drawing){
            console.log('drawing to edit', drawing);
            MakeFactory.setDrawing(drawing);
            $window.location.href = '#!/edit';
          };

          s.deleteDrawing = function(drawingID) {
            
            MakeFactory.deleteDrawing(drawingID);
            angular.element(`#${drawingID}`)
                   .parent()
                   .remove();
          };

          s.deleteMessage = function(drawingID) {
            console.log('drawingId in message:', drawingID);
          console.log('deleteMessage fired');
              ngToast.create({  
                content: 'Drawing Deleted.',
                timeout: 2000,
                dismissButton: true,
                dismissButtonHtml: `&times;`,
                onDismiss: s.deleteDrawing(drawingID)
              });
           };
	
});