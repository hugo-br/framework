// fix the CTA for hero slides
$(window).load(function(){
$(".row__cta--hero").find(".cta").each(function(e) {
    var css = $(this).attr("data-hero");
    var s = $(this).attr("style");
    var theId = $(this).attr("id");
    var style = "@media(min-width: 1300px){#" + theId + "{ " + css + " } } @media(max-width: 1300px){#" + theId + " {"+s+"}}";
    $(this).attr("style","opacity:1");
    $("<style type='text/css'>" + style + " </style>").appendTo("head");
 });
});