$(document).ready(function(){
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  // Watch for a form submission:
  $("#form-submit-btn").click(function(e){
    e.preventDefault();
    $('input[type=submit]').prop('disabled', true);
    var error = false;
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    if(!error){
      //Get the Stripe token:
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler );
    }
    return false;
  }); // form submission
  
  function stripeResponseHandler(status, response){
    // Get reference to the form:
    var f = $('#new_user'); 
    
    //Get the token from the response:
    var token = response.id;
    
    // Add the token to the form:
    f.append('<input type="hidden" name="user[stripe_card_token]" value=" '+ token + ' "/>');
    
     // Get reference to the form by name:
    var pro_registration_form =('form[name=pro_registration_form]');
     //Submit the form:
    f.get(pro_registration_form).submit();
    
    //Submit the form:
//     f.get(0).submit();
  }
});