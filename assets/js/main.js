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
		event.preventDefault();
		var email = $('.sign-up-input', $(this)).val();
		_veroq.push(['user', {
		  id: email,
		  email: email,
		  source: 'blog'
		}]);
		_veroq.push(['tags', {    
		  id: email,    
		  add: ['Blog subscription'],    
		  remove: []  
		}]);
		localStorage.setItem("newsletter-subscribed", true);
		localStorage.setItem("newsletter-feedback", true);

		$('.newsletter-form .subscribe-inputs').hide();
		$('.newsletter-form .subscribe-success').show();
	});
});