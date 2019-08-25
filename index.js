$(document).ready(function(){
	
	var checkboxError = 0;
	var counterError = 0;

	// Sanitize and send form data
	$('#send').click(function(e){
		e.preventDefault();
		sanitize();
		// Send Data
		if (checkboxError == 0 && counterError == 0){
		   	$('#result').html('Formulário enviado com sucesso!');

		   	message = "\n\nSticker(s) Escolhido(s):\n\n"; 
		   	if ( $('#react').is(':checked') ) {message += "- React\n";}
		   	if ( $('#vue').is(':checked') ) {message += "- Vue\n";}
		   	if ( $('#angular').is(':checked') ) {message += "- Angular\n";}	
		   	message += "\nQuantidade: " + $('#quantity').val();
		   	if ( $('#obs').val() != "") {message += "\n\nObservações:\n\n" + $('#obs').val();}	
		   	console.log(message);	   		
		}
	});

	// Reset Checkboxes
	$('input[type="checkbox"] + label').click(function(){
		$('input[type="checkbox"] + label').removeClass('error');
		checkboxError = 0;
		if (counterError == 0){
			$('#send').prop('disabled', false);	
		}
	});

	// Button Increase
	$('#increase').click(function(e){
		e.preventDefault();
		$('#quantity').val($('#quantity').val()*1+1);
		$('#decrease').prop('disabled', false);
		$('#quantity').removeClass('error');
		counterError = 0;
		if (checkboxError == 0){
			$('#send').prop('disabled', false);	
		}
	});

	// Button Decrease
	$('#decrease').click(function(e){
		e.preventDefault();		
		$('#quantity').val($('#quantity').val()*1-1);
		if ($('#quantity').val() == 0) {
			$(this).prop('disabled', true);
		}
	});

	// Quantity Change
	$('#quantity').change(function(){
		if ($(this).val() > 0) {
			$('#decrease').prop('disabled', false);
		}
	});

	function sanitize() {
		// Sanitize Checkboxes
		if ( $('input[type="checkbox"]:checked').length == 0 ) {			
			checkboxError = 1;		
			$('input[type="checkbox"] + label').addClass('error');
			$('#send').prop('disabled', true);		
		}
		
		// Sanitize Counter
		if ( $('#quantity').val() == 0 ) {
			counterError = 1;
			$('#quantity').addClass('error');		
			$('#send').prop('disabled', true);
		}
	}
});