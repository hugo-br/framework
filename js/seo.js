  $(document).ready(function(e) {
  
  const seoText = {
  more: {
    en: "Read more",
    en_CA: "Read more",
    fr_CA: "Voir plus",
    en_US: "Read more"
  },
  less: {
    en: "Read less",
    en_CA: "Read less",
    fr_CA: "Voir moins",
    en_US: "Read less"
  }
};
  
  // seo toogle class
  $(".js-bsect-readMore").on('click touchstart', function(e) {

  
    var $height = 180;
    var $parent = $(this).parent(".row__bsect");

    //stop animation if any
    $parent.stop(true);
    var $that = $(this); // instruction button
    //$that.off('touchstart').off('click').off('tap');
    $that.fadeOut(50);


    // close the text
    if ($(this).hasClass("is-more")) {
    // 
     
      $parent.animate({ height: $height }, 1000, function() {
        $parent.removeClass("is-more");
        $that.removeClass("is-more").text(seoText.more[lciLocale]);
        $that.fadeIn(200);
      });

    } 
	// open the text
	else {
      
      $parent.css("height", "auto");
      var autoHeight = $parent.outerHeight();
      $parent.css("height", $height);

      $parent.animate({ height: autoHeight }, 1000, function() {
        $parent.addClass("is-more");
        $that.addClass("is-more");
        $that.text(seoText.less[lciLocale]);
        $that.fadeIn(200);
      });
    }
  });




}); // @end DOM function

// window resize
$(window).resize(function() {
  // resize the content height if seo open
  if ($(".js-bsect-readMore.is-more").length >= 1) {
    $(".js-bsect-readMore.is-more")
      .removeClass("is-more")
      .text(seoText.more[lciLocale]);
    $(".row__bsect")
      .stop(true)
      .removeClass("is-more")
      .attr("style", "");
  }
}); // @end window resize