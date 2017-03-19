"use strict";



app.controller('MakeCtrl', function($scope, MakeFactory, AuthFactory) {
        
        let s = $scope;
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let userID = AuthFactory.getUserObj().uid; 
        
        s.display = function(){
	        s.character = MakeFactory.getCharacter();
    	    console.log('s.character:',s.character);
        	ctx.font = "300px serif";
        	ctx.textAlign="center";
        	ctx.strokeText(s.character[0], 200, 300);
        	
        };

        s.display();


        s.save = function(){
          console.log('drawing to save:', drawing);
          let data = {

            uid: userID,
            drawing: drawing

          };
          console.log('data:', data);
          MakeFactory.save(data);
        };

  //drawing

  //basic characteristics of the line
    ctx.lineWidth = 10;
    ctx.lineJoin = ctx.lineCap = 'round';

    var isDrawing, lastPoint;
    var drawing = [];
    var currentPath = [];

//called on mousedown
    function startPath() {
      currentPath = [];
    }
//called on mouse up
    function endPath() {
      drawing.push(currentPath);
      console.log('drawing:', drawing);
    }

//clears path, sets drawing to true, initialize a point object            
    canvas.onmousedown = function($event) {
      startPath();
      isDrawing = true;
      lastPoint = { x: $event.offsetX, y: $event.offsetY };
    };

//begins path and creates multiple paths offset from x and y with variable opacity

    canvas.onmousemove = function($event) {

      if (!isDrawing) return;

      ctx.beginPath();
      
      ctx.globalAlpha = 1;
      ctx.moveTo(lastPoint.x - 4, lastPoint.y - 4);
      ctx.lineTo($event.offsetX - 4, $event.offsetY - 4);
      ctx.stroke();
      
      ctx.globalAlpha = 0.6;
      ctx.moveTo(lastPoint.x - 2, lastPoint.y - 2);
      ctx.lineTo($event.offsetX - 2, $event.offsetY - 2);
      ctx.stroke();
      
      ctx.globalAlpha = 0.4;
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo($event.offsetX, $event.offsetY);
      ctx.stroke();
      
      ctx.globalAlpha = 0.3;
      ctx.moveTo(lastPoint.x + 2, lastPoint.y + 2);
      ctx.lineTo($event.offsetX + 2, $event.offsetY + 2);
      ctx.stroke();
      
      ctx.globalAlpha = 0.2;
      ctx.moveTo(lastPoint.x + 4, lastPoint.y + 4);
      ctx.lineTo($event.offsetX + 4, $event.offsetY + 4);
      ctx.stroke();
        
      lastPoint = { x: $event.offsetX, y: $event.offsetY };

      currentPath.push(lastPoint);

    };

    canvas.onmouseup = function() {
      endPath();
      isDrawing = false;
    };


});



