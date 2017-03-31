"use strict";

app.controller('EditCtrl', function($scope, $window, $timeout, MakeFactory, AuthFactory, ngToast){
	
	let s = $scope;
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	let userID = AuthFactory.getUserObj().uid;
	s.offCanvas = false;
	s.drawing;


	

	s.render = function(drawing){

		  console.log('rendering', drawing);
	      
	      ctx.lineWidth = 10;
	      ctx.lineJoin = ctx.lineCap = 'round';

	      drawing.forEach((path)=>{
	      
	      

	        path.forEach((point)=>{

	           		var currentPoint = { x: point.x, y: point.y };
	      
	      
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

	        //drawing

	        //basic characteristics of the line
	            ctx.lineWidth = 10;
	            ctx.lineJoin = ctx.lineCap = 'round';

	            var isDrawing, lastPoint;
	            var drawing = MakeFactory.getDrawing();
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


	        s.printEdit = function(){
	        console.log('printEdit running');
	        var drawingObj = MakeFactory.getDrawingObj();
	        console.log('drawing from make.fac:', drawing);
	        s.drawing = drawingObj;
	        $timeout();
	        canvas.style.backgroundImage = `url(${drawingObj.background})`;
	        s.render(drawingObj.drawing);	
	        };

	        s.printEdit();

	        s.saveMessage = function() {
	          console.log('saveMessage fired');
	              ngToast.create({  
	                content: 'Edit Saved!',
	                dismissButton: true,
	                dismissButtonHtml: `<span class="glyphicon glyphicon-home"></span>`,
	                onDismiss: s.goHome

	              });
	           };

	        s.goHome = function(){
	        	$window.location.href = '#!/home';
	        };
	         

	        s.patch = function(){
	          let drawingObj = MakeFactory.getDrawingObj();
	          drawingObj.img = canvas.toDataURL();
	          MakeFactory.patchDrawing(drawingObj);
	          $timeout();
	          s.saveMessage();
	          console.log('drawingObj in ctrl patch:', drawing);
	        };

	        s.removeLastStroke = function(){
	          var drawing = MakeFactory.getDrawing();
	          var lastPath = drawing.length-1;
	          drawing.splice(lastPath);
	          ctx.clearRect(0,0, 400, 400);
	          s.render(drawing);
	        };

	        s.deleteAttempt = function(){
	          ctx.clearRect(0,0, 400, 400);
	          s.save();
	          $window.location.href = '#!/home';
	        };

	        s.deleteDrawing = function() {
	        	let drawingID = MakeFactory.getDrawingObj().drawingID;
	        	console.log('deleting this drawing:', drawingID);
	        	MakeFactory.deleteDrawing(drawingID);
	        	ctx.clearRect(0,0, 400, 400);
				

	        };


	
});