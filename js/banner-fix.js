$(".banner__img--desktop").on("load", function() {
    $(this).parents(".banner").animate({"opacity":1}, 700);
 }).each(function() {

   $(this).parents(".banner").css({"opacity":0});

   if(this.complete) {
      $(this).load(); // For jQuery < 3.0 
   }
 });