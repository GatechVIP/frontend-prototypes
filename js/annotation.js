function annotate(e) {
    var t = document.getSelection();
    console.log(inText);
    if ($('div.popup').length == 0 && t.toString().length > 0) {
        inText = true;
        $("body").append('<div class="popup" style="position:absolute; background-color:#FFFFFF; border-style:solid; top:' + e.pageY + 'px; left:' + e.pageX + 'px;"><form name="annotation"><textarea rows=5 cols=25 id="annotate"></textarea><input type=button value="Save" onclick="saveComment(' + e.pageY + ')"></form></div>');
    }
}

function customAnnotate(e) {
    if ($('div.popup').length == 0) {
        inText = true;
        $("body").append('<div class="popup" style="position:absolute; background-color:#FFFFFF; border-style:solid; top:' + (e.pageY + 20) + 'px; left:' + (e.pageX - 50) + 'px;"><form name="annotation"><textarea rows=5 cols=25 id="annotate"></textarea><input type=button value="Save" onclick="saveCommentRight(' + e.pageY + ')"></form></div>');
    }
}

function saveComment(pageY) {
    $("body").append('<div class="margin" style="position:absolute; top:' + pageY + 'px">' + $("#annotate").val() + '</div>');
    $('div.popup').remove();
}

function saveCommentRight(pageY) {
    $("body").append('<div class="margin" style="position:absolute; top:' + (pageY + rightTopPadding) + 'px; right:0px">' + $("#annotate").val() + '</div>');
    $('div.popup').remove();
    rightTopPadding += 50;
}

function bodyClick() {
    if (inText == false) {
        $('div.popup').remove();
    }
    inText = false;
}

function annotationButtonClick() {
    if (menuVisible == false) {
        menuVisible = true;
        $("#expand").show();
    }
    else {
        menuVisible = false;
        $("#expand").hide();
    }
}