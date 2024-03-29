    // Picture element HTML5 shiv
    document.createElement("picture");
	
	// defer css
    var loadDeferredStyles = function () {
      var addStylesNode = document.getElementById("deferred-styles");
	  if(addStylesNode){
	      var replacement = document.createElement("div");
			replacement.innerHTML = addStylesNode.textContent;
			document.body.appendChild(replacement)
			addStylesNode.parentElement.removeChild(addStylesNode);  
	  }
    };
	
    var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	  
    if (raf) {raf(function () {
      window.setTimeout(loadDeferredStyles, 0);
    });
	}
    else {window.addEventListener('load', loadDeferredStyles);}

    // Polyfill for responsive images
    function loadJS(u) {
      var r = document.getElementsByTagName("script")[0],
        s = document.createElement("script");
      s.src = u;
      r.parentNode.insertBefore(s, r);
    }

    if (!window.HTMLPictureElement) {
      document.createElement('picture');
      loadJS("https://static.lechateau.com/html/landing/templates/new/respimage.min.js");
    }
	