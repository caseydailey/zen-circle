"use strict";



app.controller('MakeCtrl', function($scope, $window, MakeFactory, AuthFactory) {
        
        let s = $scope;
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let userID = AuthFactory.getUserObj().uid; 
        var background;
        s.word = MakeFactory.getWord();
        s.offCanvas = false;
        s.saving = false;

  //this is ridiculous and unnecessarily complicated...      
        s.display = function(){
	        s.character = MakeFactory.getCharacter();
    	    console.log('s.character:',s.character);
          if(s.character.length > 1){
            s.character.shift();
            // console.log(s.character);
            ctx.font = "300px serif";
            ctx.textAlign="center";
            ctx.strokeText(s.character[0], 200, 300);
            background = canvas.toDataURL();
            ctx.clearRect(0,0, 400, 400);
            // console.log('background:', background);
            canvas.style.backgroundImage = `url(${background})`;

          } else {
          ctx.font = "300px serif";
          ctx.textAlign="center";
          ctx.strokeText(s.character[0], 200, 300);
          background = canvas.toDataURL();
          ctx.clearRect(0,0, 400, 400);
          // console.log('background:', background);
          canvas.style.backgroundImage = `url(${background})`;

        	}
        };

        s.display();


        s.save = function(){
          var dataURL = canvas.toDataURL();
          console.log(dataURL);
          var drawingData = {
            uid: userID,
            drawing: drawing,
            img: dataURL,
            word: s.word,
            background: background
          };
          MakeFactory.save(drawingData).then(()=>{
          s.saving = true;
          setTimeout(2000);
            $window.location.href = '#!/home';
          });
          
        };

        s.removeLastStroke = function(){
          let lastPath = drawing.length-1;
          drawing.splice(lastPath);
          s.display();
          s.render(drawing);
        };

        s.deleteAttempt = function(){
          ctx.clearRect(0,0, 400, 400);
          s.display();
        };

        s.goToFind = function(){
          $window.location.href = '#!/find';
        };

        s.goHome = function(){
          $window.location.href = '#!/home';
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

    s.render = function(drawing){
          
          ctx.clearRect(0,0, 400, 400);
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

            

});



