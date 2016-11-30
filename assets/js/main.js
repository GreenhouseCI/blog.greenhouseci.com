$(document).ready(function() {
	//localStorage.clear();
	if(localStorage.getItem("newsletter-subscribed") && !localStorage.getItem("newsletter-feedback")) {
		$('.newsletter-form').hide();
	}
	if(localStorage.getItem("newsletter-feedback")) {
		$('.newsletter-form .subscribe-inputs').hide();
		$('.newsletter-form .subscribe-success').show();
		localStorage.removeItem("newsletter-feedback");
	}
	$('.newsletter-form form.sign-up').submit(function(event) {
		localStorage.setItem("newsletter-subscribed", true);
		localStorage.setItem("newsletter-feedback", true);
	});
});