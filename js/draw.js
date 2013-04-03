function canvasInit() {
    var canvas = document.getElementById("pagecanvas"),
                    ctx = canvas.getContext("2d"),
                    painting = false,
                    lastX = 0,
                    lastY = 0,
                    lineThickness = 1;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.onmousedown = function (e) {
        if (drawing) {
            painting = true;
            ctx.fillStyle = "#CD1F21";
            lastX = e.pageX - this.offsetLeft;
            lastY = e.pageY - this.offsetTop;
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
                mouseX = e.pageX - this.offsetLeft;
                mouseY = e.pageY - this.offsetTop;
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

    document.onmouseup = annotate;
    document.getElementById('annotatebutton').onclick = customAnnotate;
    if (!document.all) document.captureEvents(Event.MOUSEUP);
}

function drawButtonClick() {
    if (drawing == false) {
        $("#pagecanvas").css("z-index", 5);
        drawing = true;
        $("#pencilicon").attr("src", "imgs/2newpencil.jpg");
    }
    else {
        $("#pagecanvas").css("z-index", 1);
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