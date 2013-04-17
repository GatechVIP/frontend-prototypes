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

$(document).ready(function() {
	$gradediv = $('#gradediv');
	$addbutton = $('#gradeadd');
	
	var numChangeHandler = function() {
		var sum = 0;
		$gradediv.find('.gradenum').each(function() {
			var n = parseInt($(this).val());
			sum += isNaN(n) ? 0 : n;
		});
		$('#gradenumtot').val(sum+'');
	};
	
	var denChangeHandler = function() {
		var sum = 0;
		$gradediv.find('.gradeden').each(function() {
			var n = parseInt($(this).val());
			sum += isNaN(n) ? 0 : n;
		});
		$('#gradedentot').val(sum+'');
	};
	
	var removeHandler = function() {
		$(this).parent().remove();
		numChangeHandler();
		denChangeHandler();
	};
	
	$addbutton.click(function() {
		var newdiv = $('<div><input type="text" size=10/></div>');
		
		var num = $('<input type="text" class="gradenum" size=2/>');
		num.change(numChangeHandler);
		num.appendTo(newdiv);
		
		$(document.createTextNode('/')).appendTo(newdiv);
		
		var den = $('<input type="text" class="gradeden" size=2/>');
		den.change(denChangeHandler);
		den.appendTo(newdiv);
		
		var rmbut = $('<button>-</button>');
		rmbut.click(removeHandler);
		rmbut.appendTo(newdiv);
		
		newdiv.appendTo(gradediv);
	});
});
