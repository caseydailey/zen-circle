"use strict";

app.controller('EditCtrl', function($scope, $window, $timeout, MakeFactory, AuthFactory, ngToast){
	
	//variables
	let s = $scope;
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	let userID = AuthFactory.getUserObj().uid;
	var isDrawing;
	var lastPoint;
	var drawing = MakeFactory.getDrawing();
	var currentPath = [];

	//properties
	ctx.lineWidth = 10;
	ctx.lineJoin = ctx.lineCap = 'round';
	s.offCanvas = false;
	s.drawing; 

	//iterates through the drawing array and prints each point in each path, offset to creat multiple vectors of varied opacity
	s.render = (drawing) =>{
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

	              });//end for each point
	          	  });//end for each path
	        	  };//end render

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

	//ends path. stops drawing.
	canvas.onmouseup = function() {
	  endPath();
	  isDrawing = false;
	};

	//prints background image and drawing on load
	s.printEdit = function(){
	var drawingObj = MakeFactory.getDrawingObj();
	s.drawing = drawingObj;
	$timeout();
	canvas.style.backgroundImage = `url(${drawingObj.background})`;
	s.render(drawingObj.drawing);	
	};
	//invoked on load
	s.printEdit();

	//creates a toast to confirm save, then redirects home
	s.saveMessage = function() {
	  ngToast.create({  
	  content: 'Edit Saved!',
	  dismissButton: true,
	  dismissButtonHtml: `<span class="glyphicon glyphicon-home"></span>`,
	  onDismiss: s.goHome
	});
    };

    //goes home
	s.goHome = function(){
	  $window.location.href = '#!/home';
	};
	         
	//saves the new drawing and makes a patch call to firebase through through makefactory
	s.patch = function(){
	  let drawingObj = MakeFactory.getDrawingObj();
	  drawingObj.img = canvas.toDataURL();
	  MakeFactory.patchDrawing(drawingObj);
	  $timeout();
	  s.saveMessage();
	  console.log('drawingObj in ctrl patch:', drawing);
	};

	//removes last stroke clears the canvas and redraws the drawing minus the last stroke
	s.removeLastStroke = function(){
	  var drawing = MakeFactory.getDrawing();
	  var lastPath = drawing.length-1;
	  drawing.splice(lastPath);
	  ctx.clearRect(0,0, 400, 400);
	  s.render(drawing);
	};

	//this makes no sense
	s.deleteAttempt = function(){
	  ctx.clearRect(0,0, 400, 400);
	  s.save();
	  $window.location.href = '#!/home';
	};

	//deletes drawing from firebase and clears the canvas
	s.deleteDrawing = function() {
	 let drawingID = MakeFactory.getDrawingObj().drawingID;
	 MakeFactory.deleteDrawing(drawingID);
	 ctx.clearRect(0,0, 400, 400);
	};

});//end constructor