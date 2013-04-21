function setHighlight(node){
	var range, html;
    if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        range.deleteContents();
        range.insertNode(node);
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        html = (node.nodeType == 3) ? node.data : node.outerHTML;
        range.pasteHTML(html);
    }
}
function removeHighlight(){
    // Todo
}

function setLink(){
    var annotation = $("div#highlight"+lineIndex);
    var highlight = $("span#highlight"+lineIndex);
    var highlightPosition = highlight.offset();
    var highlightWidth = highlight.width();
    var highlightHeight = highlight.height();
    var annotationPosition = annotation.offset();
    var annotationWidth = annotation.width();
    var annotationHeight = annotation.height();
    lastAnnotationTop = annotationPosition.top + annotationHeight+20;
    preloadedImages = document.getElementById('preload').getElementsByTagName('img')
    drawLine(lineIndex,highlightPosition.left,highlightPosition.top+highlightHeight,annotationPosition.left+annotationWidth, annotationPosition.top);
    lineIndex++;
    document.getElementById('content').onmouseup = annotate;
}

function drawLine( lineIndex, x1, y1, x2, y2 )
{
    objectHandle = document.getElementById( "line"+ lineIndex )
    if( !objectHandle )
    {
        document.body.innerHTML += "<img id='line"+ lineIndex +"' class='line' />"
        objectHandle = document.getElementById( "line"+ lineIndex )
    }

    updateLine( objectHandle, x1, y1, x2, y2 )
}

function updateLine( lineObjectHandle, Ax, Ay, Bx, By )
{
    var
        xMin        = Math.min( Ax, Bx ),
        yMin        = Math.min( Ay, By ),
        xMax        = Math.max( Ax, Bx ),
        yMax        = Math.max( Ay, By ),
        boxWidth    = Math.max( xMax-xMin, 1 ),
        boxHeight   = Math.max( yMax-yMin, 1 ),
        tmp         = Math.min( boxWidth, boxHeight, 256 ),
        lineIndex   = (Bx-Ax)*(By-Ay)<0?0:1

    while( tmp>>=1 )
        lineIndex+=2

    lineObjectHandle.src = preloadedImages[lineIndex].src
    with( lineObjectHandle.style )
    {
        width   = boxWidth  +"px"
        height  = boxHeight +"px"
        left    = xMin      +"px"
        top     = yMin      +"px"
    }
}

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}