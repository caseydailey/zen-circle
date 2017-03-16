"use strict";



app.controller('MakeCtrl', function($scope, MakeFactory) {
        
        let s = $scope;
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');

        s.display = function(){
	        s.character = MakeFactory.getCharacter();
    	    console.log('s.character:',s.character);
        	context.font = "300px serif";
        	context.textAlign="center";
        	context.strokeText(s.character[0], 200, 300);
        	
        };

        s.display();



        var isDrawing, x, y;
        var drawing = [];
        var currentPath = [];

        function startPath() {
          currentPath = [];
          console.log('currentPath:', currentPath);
        }

        function endPath() {
          drawing.push(currentPath);
          console.log('drawing:', drawing);
        }


        canvas.onmousedown = function($event) {

          startPath();

          isDrawing = true;
          x = $event.offsetX;
          y = $event.offsetY;
          context.moveTo(x,y);

        };

        canvas.onmousemove = function($event) {
          if (isDrawing) {
            x = $event.offsetX;
            y = $event.offsetY;
            context.lineTo(x,y);
            context.stroke();

            var point = {
              x: x,
              y: y 
            };
            
            currentPath.push(point);
            console.log('currentPath:', currentPath);

          }

          
        };

        canvas.onmouseup = function() {
          endPath();
          isDrawing = false;
        };

        // s.save = function(){
        //   var re
        // }
 		

 		// let x,y;
        	
   //      	function midPointBtw(p1, p2) {
   //      	  return {
   //      	    x: p1.x + (p2.x - p1.x) / 2,
   //      	    y: p1.y + (p2.y - p1.y) / 2
   //      	  };

   //      	}

   //      	ctx.lineWidth = 1;
   //      	ctx.lineJoin = ctx.lineCap = 'round';

   //      	var isDrawing, points = [];

   //      	canvas.onmousedown = function(e) {
   //      	  isDrawing = true;
   //      	  points.push({ x: e.clientX, y: e.clientY });
   //      	  console.log("x:", x);
   //      	  console.log("y:", y);
   //      	};

   //      	canvas.onmousemove = function(e) {
   //      	  if (!isDrawing) return;
        	  
   //      	  points.push({ x: e.clientX, y: e.clientY });
   //      	  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        	  
   //      	  ctx.strokeStyle = 'rgba(0,0,0,1)';
   //      	  stroke(offsetPoints(-4));
   //      	  ctx.strokeStyle = 'rgba(0,0,0,0.8)';
   //      	  stroke(offsetPoints(-2));
   //      	  ctx.strokeStyle = 'rgba(0,0,0,0.6)';
   //      	  stroke(points);
   //      	  ctx.strokeStyle = 'rgba(0,0,0,0.4)';
   //      	  stroke(offsetPoints(2));
   //      	  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
   //      	  stroke(offsetPoints(4));
   //      	};

   //      	function offsetPoints(val) {
   //      	  var offsetpoints = [];
   //      	  for (var i = 0; i < points.length; i++) {
   //      	    offsetpoints.push({ 
   //      	      x: points[i].x + val,
   //      	      y: points[i].y + val
   //      	    });
   //      	  }
   //      	  return offsetpoints;
   //      	}

   //      	function stroke(points) {

   //      	  var p1 = points[0];
   //      	  var p2 = points[1];
        	  
   //      	  ctx.beginPath();
   //      	  ctx.moveTo(p1.x, p1.y);

   //      	  for (var i = 1, len = points.length; i < len; i++) {
   //      	    // we pick the point between pi+1 & pi+2 as the
   //      	    // end point and p1 as our control point
   //      	    var midPoint = midPointBtw(p1, p2);
   //      	    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
   //      	    p1 = points[i];
   //      	    p2 = points[i+1];
   //      	  }
   //      	  // Draw last line as a straight line while
   //      	  // we wait for the next point to be able to calculate
   //      	  // the bezier control point
   //      	  ctx.lineTo(p1.x, p1.y);
   //      	  ctx.stroke();
   //      	}

   //      	canvas.onmouseup = function() {
   //      	  isDrawing = false;
   //      	  points.length = 0;
   //      	};
        });



