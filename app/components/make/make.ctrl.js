"use strict";



app.controller('MakeCtrl', function($scope, $window, $timeout, MakeFactory, AuthFactory, ngToast) {
        
        //initialize some variables
        let s = $scope;
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let userID = AuthFactory.getUserObj().uid; 
        var background;
        var isDrawing, lastPoint;
        var drawing = [];
        var currentPath = [];
        
        //set some properties
        ctx.lineWidth = 10;
        ctx.lineJoin = ctx.lineCap = 'round';
        s.word = MakeFactory.getWord();
        s.offCanvas = false;
        s.saving = false;
        
            


        
        //creates a toast for 1 sec to confirm save and then redirects to home
        s.saveMessage = function() {
          ngToast.create({  
            content: 'Drawing Saved!',
            timeout: 1000,
            dismissButton: true,
            dismissButtonHtml: `<span class="glyphicon glyphicon-home"></span>`,
            onDismiss: s.goHome

          });
        };

        let doBackground = function(characterArray){
            ctx.lineWidth = 1;
            ctx.font = "300px serif";
            ctx.textAlign="center";
            ctx.strokeStyle = "grey";
            ctx.strokeText(characterArray[0],200, 300);
            background = canvas.toDataURL();
            ctx.clearRect(0,0, 500, 400);
            canvas.style.backgroundImage = `url(${background})`;
            //reset line props for draw
            ctx.strokeStyle = "black";
            ctx.lineWidth = 10;
          };


        //if more than one character splice else dont then display()
        s.display = function(){
	        s.character = MakeFactory.getCharacter();
          if(s.character.length > 1){
            s.character.shift();
            doBackground(s.character);
            } else { 
              doBackground(s.character);
            }
          };

          //invoke on load
          s.display();

      //toast, save drawing img, send to firebase with a few properties
        s.save = function(){
          s.saveMessage();
          var dataURL = canvas.toDataURL();

          var drawingData = {
                uid: userID,
                drawing: drawing,
                img: dataURL,
                word: s.word,
                background: background
              };
          MakeFactory.save(drawingData);
        };

        //when clicked identify last path and splice it from drawing, display background again and render modified drawing
        s.removeLastStroke = function(){
          let lastPath = drawing.length-1;
          drawing.splice(lastPath);
          s.display();
          s.render(drawing);
        };

        //clears current drawing and re-displays background img
        s.deleteAttempt = function(){
          ctx.clearRect(0,0, 500, 400);
          s.display();
        };

        //goes to find
        s.goToFind = function(){
          $window.location.href = '#!/find';
        };

        //goes home
        s.goHome = function(){
          $window.location.href = '#!/home';
        };


////////////////      
///
///   drawing        
///
//////////////////



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

    //quits drawing. doesn't fire if mouse is released outside of canvas
    canvas.onmouseup = function() {
      endPath();
      isDrawing = false;
    };

    //reders the drawing object as lines
    s.render = function(drawing){
    //clear current canvas, display background img and initialize currentPoint
      ctx.clearRect(0,0, 500, 400);
      s.display();
      let currentPoint;

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

});//constructor



