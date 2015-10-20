$("#login-button").click(function(event) {
	event.preventDefault();
	$('.wrapper').addClass('form-success');
	$(this.form).fadeOut(1500, function() {
		window.location.href = 'search.html';
	});
});