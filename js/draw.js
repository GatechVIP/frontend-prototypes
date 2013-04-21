var drawShape = "";
function canvasInit() {
    var canvas = document.getElementById("pagecanvas"),
                    ctx = canvas.getContext("2d"),
                    painting = false,
                    lastX = 0,
                    lastY = 0,
                    lineThickness = 1;

	canvas.height = canvas.offsetHeight;
	canvas.width = canvas.offsetWidth;
	
    canvas.onmousedown = function (e) {
        if (drawing) {
            painting = true;
            ctx.fillStyle = "#CD1F21";
            ctx.strokeStyle = "#CD1F21";
            lastX = e.pageX - this.parentNode.offsetLeft;
            lastY = e.pageY - this.parentNode.offsetTop;
        }
    };

    canvas.onmouseup = function (e) {
        if (drawing) {
            painting = false;
        }
    }

    canvas.onmousemove = function (e) {
        if (drawing) {
            if (painting) {
                mouseX = e.pageX - this.parentNode.offsetLeft;
                mouseY = e.pageY - this.parentNode.offsetTop;
                var x1 = mouseX,
                    x2 = lastX,
                    y1 = mouseY,
                    y2 = lastY;
                var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
                if (steep) {
                    var x = x1;
                    x1 = y1;
                    y1 = x;
                    var y = y2;
                    y2 = x2;
                    x2 = y;
                }
                if (x1 > x2) {
                    var x = x1;
                    x1 = x2;
                    x2 = x;
                    var y = y1;
                    y1 = y2;
                    y2 = y;
                }
                var dx = x2 - x1,
                    dy = Math.abs(y2 - y1),
                    error = 0,
                    de = dy / dx,
                    yStep = -1,
                    y = y1;
                if (y1 < y2) {
                    yStep = 1;
                }
                lineThickness = 5 - Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) / 10;
                if (lineThickness < 1) {
                    lineThickness = 1;
                }
                for (var x = x1; x < x2; x++) {
                    if (steep) {
                        ctx.fillRect(y, x, lineThickness, lineThickness);
                    } else {
                        ctx.fillRect(x, y, lineThickness, lineThickness);
                    }

                    error += de;
                    if (error >= 0.5) {
                        y += yStep;
                        error -= 1.0;
                    }
                }
                lastX = mouseX;
                lastY = mouseY;
            }
        }
    }

    document.getElementById('content').onmouseup = annotate;
    document.getElementById('annotatebutton').onclick = customAnnotate;
    if (!document.all) document.captureEvents(Event.MOUSEUP);
}

function shapeCanvasInit() {
    var canvas = document.getElementById("shapecanvas"),
                    ctx = canvas.getContext("2d"),
                    painting = false,
                    firstX = 0,
                    firstY = 0,
                    mouseX,
                    mouseY;

    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    
    canvas.onmousedown = function (e) {
        if (drawing) {
            painting = true;
            ctx.strokeStyle = "#CD1F21";
            console.log(drawShape);
            firstX = e.pageX - this.parentNode.offsetLeft;
            firstY = e.pageY - this.parentNode.offsetTop;
        }
    };

    canvas.onmouseup = function (e) {
        if (drawing) {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            painting = false;
            var context = document.getElementById("pagecanvas").getContext("2d");
            if(drawShape === "rect"){
                drawRectOnCanvas(context, firstX, firstY, mouseX-firstX, mouseY-firstY);
            }
            else if(drawShape === "circle"){
                drawEllipse(context, firstX, firstY, mouseX-firstX, mouseY-firstY);
            }
            
        }
    }

    canvas.onmousemove = function (e) {
        if (drawing) {
            if (painting) {
                ctx.clearRect(0,0, canvas.width, canvas.height);
                mouseX = e.pageX - this.parentNode.offsetLeft;
                mouseY = e.pageY - this.parentNode.offsetTop;
                
                if(drawShape === "rect") {
                    drawRectOnCanvas(ctx, firstX, firstY, mouseX-firstX, mouseY-firstY);
                }
                else if(drawShape === "circle") {
                    drawEllipse(ctx, firstX, firstY, mouseX-firstX, mouseY-firstY);
                }
                
                
            }
        }
    }

    document.getElementById('content').onmouseup = annotate;
    document.getElementById('annotatebutton').onclick = customAnnotate;
    if (!document.all) document.captureEvents(Event.MOUSEUP);
}


function drawButtonClick() {
    if (drawing == false) {
        $("#pagecanvas").css("z-index", 9999);
        drawing = true;
        $("#pencilicon").attr("src", "imgs/2newpencil.jpg");
    }
    else {
        $("#pagecanvas").css("z-index", -9999);
        drawing = false;
        $("#pencilicon").attr("src", "imgs/2pencil.jpg");
    }
}

function colorButtonClick() {
    shapepickerVisible = false;
    $("#shapepicker").hide();
    if (colorpickerVisible == false) {
        colorpickerVisible = true;
        $("#colorpicker").show();
    }
    else {
        colorpickerVisible = false;
        $("#colorpicker").hide();
    }
}

function shapeButtonClick() {
    colorpickerVisible = false;
    $("#colorpicker").hide();
    if (shapepickerVisible == false) {
        shapepickerVisible = true;
        $("#shapepicker").show();
    }
    else {
        shapepickerVisible = false;
        $("#shapepicker").hide();
    }
}

function drawRectClick() {
    if (drawing == false) {
        $("#shapecanvas").css("z-index", 9999);
        drawing = true;
        drawShape = "rect";
        $("#recticon").attr("src", "imgs/rect_red.jpg");
    }
    else {
        $("#shapecanvas").css("z-index", -9999);
        drawing = false;
        $("#recticon").attr("src", "imgs/rect.jpg");
    }
}

function drawCircleClick() {
    if (drawing == false) {
        $("#shapecanvas").css("z-index", 9999);
        drawing = true;
        drawShape = "circle";
        $("#circleicon").attr("src", "imgs/circle_red.jpg");
    }
    else {
        $("#shapecanvas").css("z-index", -9999);
        drawing = false;
        $("#circleicon").attr("src", "imgs/circle.jpg");
    }
}

function drawRectOnCanvas(ctx, firstX, firstY, w, h){
    ctx.strokeStyle = "#CD1F21";
    ctx.beginPath();
    ctx.rect(firstX, firstY, w, h);
    ctx.closePath();
    ctx.stroke();
}

//Function from Stack Overflow (http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas)
function drawEllipse(ctx, x, y, w, h) {
  ctx.strokeStyle = "#CD1F21";
  var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  ctx.closePath();
  ctx.stroke();
}