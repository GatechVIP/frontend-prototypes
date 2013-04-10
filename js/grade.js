function gradeButtonClick() {
    if (gradesVisible == false) {
        $("#leftcontent").css("width", "80%");
        $("#rightcontent").css("width", "20%");
        $("#grades").show();
        gradesVisible = true;
    }
    else {
        $("#leftcontent").css("width", "95%");
        $("#rightcontent").css("width", "0%");
        $("#grades").hide();
        gradesVisible = false;
    }
}