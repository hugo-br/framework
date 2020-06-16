// UI/UX for forms 
// General functions
$(document).ready(function() {



    // verification of data on typing
    $(".js-input").blur(function() {
      $(".form.error-message").empty();
      if ($(this).val()) {
        $(this).addClass("used");
        var inputType = $(this).attr("data-input");
        var val = $(this)
          .val()
          .trim();
        var that = $(this);
      //  verifyValue(inputType, val, that);
      } else {
        $(this)
          .removeClass("used")
          .removeClass("error")
          .removeClass("good")
          .siblings(".messages")
          .text("")
          .removeClass("error");
      }
    });
  
  
    // submit form
    $(".js-submit").click(function(e) {
      e.preventDefault();
     // verifyForm($(this));
    });
  
  
      // fix bug if prefill
      $(".js-input").each(function(){
        if ($(this).val()) {
          $(this).blur();
        }
      });
  
  });
  
///
  
 // function showLoading(element) {
 //   element.siblings(".form.load").addClass("process");
 //   element.addClass("process").addClass("process");
 // }
  
  function removeLoading(element) {
    element.siblings(".form.load").removeClass("process");
    element.addClass("process").removeClass("process");
  }