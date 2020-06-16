// get the locale
// call getCurrentStoreLocale();
//var

// testting purpose
var lciLocale = "en";
try {
  lciLocale = getCurrentStoreLocale() || "en";
} catch (err) {
  console.log("Error: get the current store locale");
}



// get the CatId of an URL
function getCatId() {
  var regexCat = /cat([a-z]{2,3})?[0-9]{5,8}/gm;
  var url = window.location.href;
  var m = void 0;
  var catID = "";

  while ((m = regexCat.exec(url)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regexCat.lastIndex) {
      regexCat.lastIndex++;
    }

    catID = m[0];
  }

  return catID;
}

// detect device
// return true if device
function checkDevice() {
  var isiPad = function() {
    return navigator.platform.indexOf("iPad") != -1;
  };
  var isiPhone = function() {
    return (
      //Detect iPhone
      navigator.platform.indexOf("iPhone") != -1 ||
      //Detect iPod
      navigator.platform.indexOf("iPod") != -1
    );
  };
  if (
    navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
    ) ||
    isiPad() ||
    isiPhone()
  ) {
    return true;
  }
  return false;
}

// DOM ready function
$(document).ready(function(e) {
  // check if device
  try {
    var checkDev = checkDevice();
    if (checkDev == true) {
      // show dragballs if any
      $(".dragballs").show();
    }
  } catch (err) {
    console.log("Error with the dragballs");
  }

  // dragballs click
  $(".dragballs__slide").click(function() {
    var cat = "";
    if ($(".breadcrumbs").length === 0) {
      cat = "HOME";
    } else {
      cat = $(".breadcrumbs .current > a")
        .text()
        .toUpperCase();
    }
    var slide = $(this).data("link");
    dataLayer.push({
      event: "dragballs",
      eventAction: slide, // name
      eventLabel: cat
    });
  });

}); // @end DOM function


