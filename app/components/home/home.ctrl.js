"use strict";

app.controller('HomeCtrl', function($scope, $timeout, $window, $location, AuthFactory, HomeFactory, MakeFactory) {
       
        let s = $scope;
        s.userObj = AuthFactory.getUserObj();
        let canvas = null;
        s.paths = [];

        let callPrint = function(){
          console.log('callPrint fired');
          s.print(s.paths);
        };

        //returns an array of ids
        HomeFactory.getDrawings(s.userObj.uid)
        	.then((myDrawings)=>{
            s.paths = [];
        		myDrawings.forEach((drawing)=>{
        		s.paths.push(drawing);
          });

            console.log('s.paths:', s.paths);
            $timeout(callPrint);
            
        });

          s.edit = function(drawing){
            console.log('s.edit running');
            MakeFactory.setDrawing(drawing);
            $window.location.href = '#!/edit';

          };

        
        s.print = function(drawingObj){

            drawingObj.forEach((drawing)=>{

        	  canvas = document.getElementById(`${drawing.drawingID}`);
            let currentDrawing = drawing.drawing;
            let currentPoint, offsetPoints;
            let ctx = canvas.getContext('2d');
                ctx.lineWidth = 10;
                ctx.lineJoin = ctx.lineCap = 'round';

            var img = new Image();
            img.onload = function(){
              ctx.drawImage(img,0,0);
            };
            img.src = drawing.img;
            
          	  
            // currentDrawing.forEach((path)=>{

            //   path.forEach((point)=>{

        	  	// 	  currentPoint = { x: point.x, y: point.y };
        	  
            //   	      ctx.beginPath();
              	      
            //   	      ctx.globalAlpha = 1;
            //   	      ctx.moveTo(currentPoint.x - 4, currentPoint.y - 4);
            //   	      ctx.lineTo(currentPoint.x - 4, currentPoint.y - 4);
            //   	      ctx.stroke();
              	      
            //   	      ctx.globalAlpha = 0.6;
            //   	      ctx.moveTo(currentPoint.x - 2, currentPoint.y - 2);
            //   	      ctx.lineTo(currentPoint.x - 2, currentPoint.y - 2);
            //   	      ctx.stroke();
              	      
            //   	      ctx.globalAlpha = 0.4;
            //   	      ctx.moveTo(currentPoint.x, currentPoint.y);
            //   	      ctx.lineTo(currentPoint.x, currentPoint.y);
            //   	      ctx.stroke();
              	      
            //   	      ctx.globalAlpha = 0.3;
            //   	      ctx.moveTo(currentPoint.x + 2, currentPoint.y + 2);
            //   	      ctx.lineTo(currentPoint.x + 2, currentPoint.y + 2);
            //   	      ctx.stroke();
              	      
            //   	      ctx.globalAlpha = 0.2;
            //   	      ctx.moveTo(currentPoint.x + 4, currentPoint.y + 4);
            //   	      ctx.lineTo(currentPoint.x + 4, currentPoint.y + 4);
            //   	      ctx.stroke();

            //         });
            //     });
            });
          
        };

        

	
});