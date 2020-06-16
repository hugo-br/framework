// custom function
function youtubeVideos() {
  var youtubes = document.querySelectorAll(".youtube");

  // if there's on or more than one videos, load the IFrame Player API code asynchronously
  if (youtubes.length >= 1) {
    //loading the script
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    return false;
  }
}

// API ready function
// This will loop each video and add iframe on them
function onYouTubeIframeAPIReady() {
  var youtubes = document.querySelectorAll(".youtube");
  // loop each video and create iframe with the right settings for each one
  for (var i = 0; i < youtubes.length; i++) {
    var player;
    var div = document.getElementsByClassName("youtube__video")[i];
    var divId = div.getAttribute("id");
    var videoId = div.getAttribute("data-video");
    try {
      var ratio = 0.5625;
      var width = 1300;
      var height = width * ratio;

      // if another format
      if (div.getAttribute("data-format")) {
         
        switch (div.getAttribute("data-format")) {
          
          case "hero":
            width = 2000;
            height = 2000 * ratio;
            break;
          case "banner":
                width = 1025;
                height = 1025 * ratio;
                break;            
          default:
             width = 1200;
             height = width * ratio;
        }
      }
      // create and load the video
      //console.log(videoId + "  :  " + width);
      youtubePlayer(player, divId, videoId, width, height);

    } catch (err) {
      console.log("Error on loading youtube video");
      console.log(err);
    }
  }
}

// youtube frame
function youtubePlayer(player, divId, videoId, w, h) {
  player = new YT.Player(divId, {
    videoId: videoId, // YouTube Video ID
    width: w, // Player width (in px)
    height: h, // Player height (in px)
    playerVars: {
      autoplay: 1, // Auto-play the video on load
      controls: 1, // Show pause/play buttons in player
      showinfo: 0, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      loop: 1, // Run the video in a loop
      fs: 0, // Hide the full screen button
      cc_load_policty: 0, // Hide closed captions
      iv_load_policy: 3, // Hide the Video Annotations
      autohide: 0,  // Hide video controls when playing
      suggestedQuality:'hd1080',
      playlist: videoId,
	  ecver: 2,
	  rel: 0
    },
    events: {
      onReady: function(event) {
        if ($(window).width() >= 768) {
          event.target.mute(); //event.target
          event.target.playVideo();
        //  player.setPlaybackQuality('hd1080');
        } 
      },

      onStateChange: function(event) {
        if ($(window).width() >= 768) {
          if (event.data === YT.PlayerState.ENDED) {
            event.target.playVideo();
          }
        }
      },
    }
  });
}
