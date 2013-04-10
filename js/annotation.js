function annotate(e) {
    console.log("annotate");
    var t = document.getSelection();
    console.log(inText);
    if ($('div.popup').length == 0 && t.toString().length > 0) {
        inText = true;
        $("body").append('<div class="popup" style="position:absolute; z-index: 500; background-color:#FFFFFF; border-style:solid; top:' + e.pageY + 'px; left:' + e.pageX + 'px;"><form name="annotation"><textarea rows=5 cols=25 id="annotate"></textarea><input type=button value="Save" onclick="saveComment(' + e.pageY + ')"></form></div>');
    }
}

function toggleEdit(object) {
    var pageY = object.getBoundingClientRect().top;
    var pageX = object.getBoundingClientRect().left;
    $("body").append('<div class="popup" style="position:absolute; z-index: 500; background-color:#FFFFFF; border-style:solid; top:' + pageY + 'px; left:' + pageX + 'px;"><form name="annotation"><textarea rows=5 cols=25 id="annotate">'+ object.innerHTML +'</textarea><input type=button value="Save" onclick="saveComment(' + pageY + ')"></form></div>');
    object.parentNode.removeChild(object);
}

function toggleEditRight(object, pageY) {
    //var pageY = object.getBoundingClientRect().top;
    var pageX = object.getBoundingClientRect().left;
    $("body").append('<div class="popup" style="position:absolute; z-index: 500; background-color:#FFFFFF; border-style:solid; top:' + pageY + 'px; left:' + pageX + 'px;"><form name="annotation"><textarea rows=5 cols=25 id="annotate">' + object.innerHTML + '</textarea><input type=button value="Save" onclick="updateCommentRight(' + pageY + ')"></form></div>');
    object.parentNode.removeChild(object);
}

function customAnnotate(e) {
    console.log("customAnnotate");
    if ($('div.popup').length == 0) {
        inText = true;
        $("body").append('<div class="popup" style="position:absolute; background-color:#FFFFFF; border-style:solid; top:' + (e.pageY + 20) + 'px; left:' + (e.pageX - 50) + 'px;"><form name="annotation"><textarea rows=5 cols=25 id="annotate"></textarea><input type=button value="Save" onclick="saveCommentRight(' + e.pageY + ')"></form></div>');
    }
}

function saveComment(pageY) {
    console.log("saveComment");
    $("body").append('<div class="margin" onclick="toggleEdit(this)" style="z-index:1000; position:absolute; top:' + pageY + 'px">' + $("#annotate").val() + '</div>');
    $('div.popup').remove();
}

function updateCommentRight(pageY) {
    rightTopPadding -= 50;
    console.log("updateCommentRight");
    $("body").append('<div class="margin" onclick="toggleEditRight(this)" style="z-index:1000; position:absolute; top:' + (pageY + rightTopPadding) + 'px; right:0px">' + $("#annotate").val() + '</div>');
    $('div.popup').remove();
    rightTopPadding += 50;
}

function saveCommentRight(pageY) {
    console.log("saveCommentRight");
    $("body").append('<div class="margin" onclick="toggleEditRight(this,'+pageY+')" style="z-index:1000; position:absolute; top:' + (pageY + rightTopPadding) + 'px; right:0px">' + $("#annotate").val() + '</div>');
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