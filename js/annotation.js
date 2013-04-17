var prop = true;

function annotate(e) {
    console.log("annotate");
    var t = document.getSelection();
    console.log(inText);
    if ($('div.popup').length == 0 && t.toString().length > 0) {
        inText = true;
        $("body").append('<div class="popup" style="position:absolute; z-index: 5000; background-color:#FFFFFF; border-style:solid; top:' + e.pageY + 'px; left:' + e.pageX + 'px;"><form name="annotation"><textarea rows=5 cols=25 id="annotate"></textarea><input type=button value="Save" onclick="saveComment(' + e.pageY + ')"></form></div>');
    }
}

function toggleEdit(object) {
    console.log("toggleEdit", prop);
    var text = object.innerHTML;
    var index = text.indexOf("<div");
    text = text.substr(0, index);
    if (prop) {
        var pageY = object.getBoundingClientRect().top;
        var pageX = object.getBoundingClientRect().left;
        $("body").append('<div class="popup" style="position:absolute; z-index: 5000; background-color:#FFFFFF; border-style:solid; top:' + pageY + 'px; left:' + pageX + 'px;"><form name="annotation"><textarea rows=5 cols=25 id="annotate">' + text + '</textarea><input type=button value="Save" onclick="saveComment(' + pageY + ')"></form></div>');
        object.parentNode.removeChild(object);
    }
    prop = true;
}

function toggleEditRight(object, pageY) {
    console.log("toggleEditRight");
    var text = object.innerHTML;
    var index = text.indexOf("<div");
    text = text.substr(0, index);
    if (prop) {
        //var pageY = object.getBoundingClientRect().top;
        var pageX = object.getBoundingClientRect().left;
        $("body").append('<div class="popup" style="position:absolute; z-index: 5000; background-color:#FFFFFF; border-style:solid; top:' + pageY + 'px; left:' + pageX + 'px;"><form name="annotation"><textarea rows=5 cols=25 id="annotate">' + text + '</textarea><input type=button value="Save" onclick="updateCommentRight(' + pageY + ')"></form></div>');
        object.parentNode.removeChild(object);
    }
    prop = true;
}

function customAnnotate(e) {
    console.log("customAnnotate");
    if ($('div.popup').length == 0) {
        inText = true;
        $("body").append('<div class="popup" style="position:absolute; z-index:5000; background-color:#FFFFFF; border-style:solid; top:' + (e.pageY + 20) + 'px; left:' + (e.pageX - 50) + 'px;"><form name="annotation"><textarea rows=5 cols=25 id="annotate"></textarea><input type=button value="Save" onclick="saveCommentRight(' + e.pageY + ')"></form></div>');
    }
}

function saveComment(pageY) {
    console.log("saveComment");
    $("body").append('<div class="margin" onclick="toggleEdit(this)" style="padding-right: 35px; z-index:1000; position:absolute; top:' + pageY + 'px">' + $("#annotate").val() + '<div class="minmax" onclick="toggleminmax(this,true)" style="z-index:9000">_</div><div class="deleteannotation" onclick="deleteannotation(this)" style="z-index:9000">X</div></div>');
    $('div.popup').remove();
}

function toggleminmax(object, status) {
    prop = false;
    console.log("changed prop to ", prop);
    console.log("toggleminmax");
    if (String(status) == "true") {
        object.parentNode.style.height = "15px";
        object.parentNode.style.overflow = "hidden";
        object.onclick = function () { toggleminmax(this, false); };
        object.innerHTML = "+";
    }
    if (String(status) == "false") {
        object.parentNode.style.height = "auto";
        object.parentNode.style.overflow = "visible";
        object.onclick = function () { toggleminmax(this, true); };
        object.innerHTML = "_";
    }
}

function deleteannotation(object) {
    prop = false;
    console.log("deleteannotation");
    object.parentNode.parentNode.removeChild(object.parentNode);
}

function updateCommentRight(pageY) {
    rightTopPadding -= 50;
    console.log("updateCommentRight");
    $("body").append('<div class="margin" onclick="toggleEditRight(this,' + pageY + ')" style="padding-right: 35px; z-index:1000; position:absolute; top:' + (pageY) + 'px; right:0px">' + $("#annotate").val() + '<div class="minmax" onclick="toggleminmax(this,true)" style="z-index:9000">_</div><div class="deleteannotation" onclick="deleteannotation(this)" style="z-index:9000">X</div></div>');
    $('div.popup').remove();
    rightTopPadding += 50;
}

function saveCommentRight(pageY) {
    console.log("saveCommentRight" + pageY);
    $("body").append('<div class="margin" onclick="toggleEditRight(this,' + rightTopPadding + ')" style="padding-right: 35px; z-index:1000; position:absolute; top:' + (rightTopPadding) + 'px; right:0px">' + $("#annotate").val() + '<div class="minmax" onclick="toggleminmax(this,true)" style="z-index:9000">_</div><div class="deleteannotation" onclick="deleteannotation(this)" style="z-index:9000">X</div></div>');
    $('div.popup').remove();
    rightTopPadding += 50;
}

function bodyClick() {
    console.log("bodyClick");
    if (inText == false) {
        $('div.popup').remove();
    }
    inText = false;
}

function annotationButtonClick() {
    console.log("annotationButtonClick");
    if (menuVisible == false) {
        menuVisible = true;
        $("#expand").show();
    }
    else {
        menuVisible = false;
        $("#expand").hide();
    }
}