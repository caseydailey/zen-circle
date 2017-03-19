"use strict";

app.controller('HomeCtrl', function($scope, AuthFactory, HomeFactory) {
        
        let s = $scope;
        s.userObj = AuthFactory.getUserObj();
        // let canvas = 1;
        s.paths = [];

        //returns an array of ids
        HomeFactory.getDrawings(s.userObj.uid)
        	.then((myDrawings)=>{
        		myDrawings.forEach((drawing)=>{
        		s.paths.push(drawing);
        	});
        		console.log('s.paths:', s.paths);
        		s.print(s.paths);
        });
        

				
        	

        //  s.print = function(paths){
        	
        // 	console.log('paths to print:', paths);
        	
        // 	paths.forEach((drawing)=>{

        // 	    canvas = document.getElementById(`${drawing.drawingID}`);

        // 		console.log('drawing', drawing);
        // 		console.log('drawing.drawingID:', drawing.drawingID);
        // 		console.log('${drawing.drawingID}', canvas);

        // 	});
        // };
        
        s.print = function(drawingObj){


        	  var currentPoint, offsetPoints;
        	  var canvas = document.getElementById('canvas');
        	  var ctx = canvas.getContext('2d');
        	  let drawing = drawingObj[1].drawing;
        	  
        	  ctx.lineWidth = 10;
        	  ctx.lineJoin = ctx.lineCap = 'round';
 

        	  drawing.forEach((path)=>{
          	  
              path.forEach((point)=>{

        	  		  currentPoint = { x: point.x, y: point.y };
        	  
              	      ctx.beginPath();
              	      
              	      ctx.globalAlpha = 1;
              	      ctx.moveTo(currentPoint.x - 4, currentPoint.y - 4);
              	      ctx.lineTo(currentPoint.x - 4, currentPoint.y - 4);
              	      ctx.stroke();
              	      
              	      ctx.globalAlpha = 0.6;
              	      ctx.moveTo(currentPoint.x - 2, currentPoint.y - 2);
              	      ctx.lineTo(currentPoint.x - 2, currentPoint.y - 2);
              	      ctx.stroke();
              	      
              	      ctx.globalAlpha = 0.4;
              	      ctx.moveTo(currentPoint.x, currentPoint.y);
              	      ctx.lineTo(currentPoint.x, currentPoint.y);
              	      ctx.stroke();
              	      
              	      ctx.globalAlpha = 0.3;
              	      ctx.moveTo(currentPoint.x + 2, currentPoint.y + 2);
              	      ctx.lineTo(currentPoint.x + 2, currentPoint.y + 2);
              	      ctx.stroke();
              	      
              	      ctx.globalAlpha = 0.2;
              	      ctx.moveTo(currentPoint.x + 4, currentPoint.y + 4);
              	      ctx.lineTo(currentPoint.x + 4, currentPoint.y + 4);
              	      ctx.stroke();


              });
              
          
            });
          
        };

        

	
});