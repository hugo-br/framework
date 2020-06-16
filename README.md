# Styleguide 

## Table of Contents

1. [Methodology](#BEM)
1. [Landing Pages](#Landing) 
    - [Images](#Images)
        - [Lazyload](#Lazyload)
    - [CTA](#CTA)
    - [Dragballs](#Dragballs)
1. [Banners](#Banners)
    - [Banner with images](#Images)
    - [Text Banner](#Text)
    - [SEO Banners](#SEO-Banners)
    - [Pricepoint](#Pricepoint)
1. [Ticker](#Ticker)
1. [Carousel](#Carousel)
1. [Deployment](#Deployment)


### Methodology

We try to follow the CSS BEM name convention for Landing pages and Banners. This will allow better consistence through out the website. Easier to change and maintain, lighter and faster file to load. 

#### BEM

BEM (which stands for Block-Element-Modifier) is a naming convention standard for CSS class names. It has fairly wide adoption and is immensely useful in writing CSS that is easier to read, understand, and scale. Another smart part of BEM is that everything is a class and nothing is nested.

> [block]__[element]--[modifier]

<br>

## Global Styles 

- `LP-DEVICE` breakpoint to show on Device **only** ( < 768px)
- `LP-DESKTOP` breakpoint to show on Desktop **only**  ( > 768px )

<br>

Most elements specially the text on have those modifiers 
- `--mobile` only show on device 
- `--desktop` only show on desktop

<br><br>

## Landing

### Row

A row is only a wrapper that contains differents elements like [images](#Images), [ctas](#CTA), [image-maps](#Image-map), etc...

*Can also be div tags*

``` html
<main class="page">
  <section class="row">
  </section>
</main>
```

Modifiers

`.row--show-mobile` will only show on mobile
`.row--show-desktop` will only show on desktop

``` html
<!-- show on mobile ONLY-->
<section class="row row--show-mobile">
</section>

<!-- show on desktop ONLY-->
<section class="row row--show-desktop">
</section>
```

#### Margins

By default they are **40px**. The first row shouldn't have any margin (should have class: row--margin-0) <br>
They can be modify with modifiers **row--margin-XX**. XX is every number from 0 to 100 with a step of 5 *(0,5,10,15,20...)* <br>


``` html
<!-- Margin-->
<section class="row row--margin-20">
</section>

<!-- 20px margin on mobile and 40 on desktop -->
<section class="row row--margin-mobile-20 row--margin-40-desktop">
</section>



```

### Images 

Images are responsive as their image sources change between the breakpoints (@768px). <br>
All images above the fold shouldn't be lazyload. All image under the fold should be [lazyload](#Lazyload). The image src by default is the mobile srcset <br>
Desktop images can be 3 sizes: 1300px or 815px (for outlet or sale pages), 2000px for [hero](#hero) images


``` html
    <!-- START - ROW -->
    <section class='row'>
      <div class='row__image'>
        <a href='#' title=''>
          <picture>
            <!-- [if IE 9]><audio><![endif] -->
            <!-- Mobile -->
            <source 
            media="(max-width: 768px)" 
            srcset="https://lechateau.scene7.com/is/image/LeChateau/XXXX?$jpeg-prog$">

            <!-- Desktop -->
            <source 
            media="(min-width: 768px)" 
            srcset="https://lechateau.scene7.com/is/image/LeChateau/XXXX?$jpeg-prog$">
            <!-- [if IE 9]></audio><![endif] -->

            <img
            src="https://lechateau.scene7.com/is/image/LeChateau/XXXX?$jpeg-prog$" 
            alt="" 
            decoding="async" />

          </picture>
        </a>
      </div>
    </section>
    <!-- END - ROW -->
```

#### Lazyload

Images should be lazyloaded to increase the loading speed of the website. <br>
By adding class `lazyload` to the `<img>` and prefix -data to the srcset to this will lazyload the image. 
Dependant on the `lazyload.min.js` [(see doc)](https://github.com/verlok/lazyload).

``` html
<picture>
 <!-- [if IE 9]><audio><![endif] -->
  <!-- Mobile -->
    <source media="(max-width: 768px)"
            data-srcset="https://lechateau.scene7.com/is/image/LeChateau/XXX?$jpeg-prog$">

   <!-- Desktop -->
    <source media="(min-width: 768px)"
            data-srcset="https://lechateau.scene7.com/is/image/LeChateau/XXX?$jpeg-prog$">
    <!-- [if IE 9]></audio><![endif] -->

    <img class="lazyload" 
         src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
         alt="" decoding="async" />
</picture>
```

<br>

### CTA 
> For landing pages, the CTAs should be included into the div tag row__cta. This insure they will have an absolute position.

By default the background is white with the text black. There's many classes available, refer to the cta.html document in the test folder <br>

Margins can be added on top with the class cta--margin-XX following the same [margin system](#Margins) as row without device detection (dektop or mobile). <br>

The CTAs need to be position with a `style=''` with % on the x-axis (left or right) and the y-axis (top or bottom)<br>

``` html
<!-- cta -->
  <div class="row__cta">
    <a href="#" title="" class="cta" style="left:34%; top: 38%;">
      SHOP BLAZERS
    </a>
  </div>

<!-- width classes and margin -->
  <div class="row__cta">
    <a href="#" title="" 
       class="cta cta--dark cta--margin-40" 
       style="left:34%; top: 38%;">
      SHOP BLAZERS
    </a>
  </div>
```

### Image-map

Sometimes pictures have multiple link on the same picture. To add them, we need to add some image maps to the picture. As the picture is responsive, we can't use the regular `<map>` tag. Add class `row__imageMap--show-desktop` for Desktop only, `row__imageMap--show-mobile` for Mobile only. Must use % base for width, height and coords. <br>

``` html
<!-- image-map -->
<div class="row__imageMap row__imageMap--show-desktop">
  <a href="#" title="image Map #1" style="width: 33.33%; left: 0;">&nbsp;</a>
  <a href="#" title="image Map #2" style="width: 33.33%; left: 33.33%; height: 30%; top: 10%;">&nbsp;</a>
  <a href="#" title="image Map #3" style="width: 33.33%; left: 66.66%;">&nbsp;</a>
</div>
```

<br>

#### Youtube Video

Youtube video can be added with the snippet and script below. <br>
[See documentation](#https://developers.google.com/youtube/iframe_api_reference)

``` html
    <!-- Video -->
    <section class="row">
      <div class="youtube">
        <div class="youtube__video" id="YouTubeVideoPlayer"></div>
      </div>
    </section>
    <!-- End - Video -->
```
<br>

At end of page or lower possible, add script and the function 
- `youtubeVideos()` : this check if there's any `.youtube__video` classes get the 
``` html
  <!-- Youtube script -->
  <script>
    $(window).load(function(){
      youtubeVideos();
    });
  </script>
```
<br>

#### Dragballs

Depedent on the dragscroll library [(see doc)](#https://github.com/asvd/dragscroll). The class `dragscroll` must be added in order to allow sliding with finger on mobile. <br>
It is not visible at loading. Another script look for devices. 

``` html
<!-- dragballs -->
<section class="dragballs">
  <div class="dragballs__slider dragscroll">
    <!-- Slides -->

    
  </div>
</section>
```

#### Text over 

Text can be added over an image, video, etc..
`row__text` will behave the same as a CTA. It can be placed everywhere <br>
`row__block-text` will  

**[⬆ back to top](#table-of-contents)**

<br>
<br>

## Banners

> Banners on category pages are 1025px wide by default

### Image

Background image can be added by using `banner__img` class on a `<img>`.

``` html
<!-- Mobile + desktop images -->
  <section class="banner">
    <!-- desktop -->
    <img class="banner__img banner__img--desktop"
      src="https://lechateau.scene7.com/is/image/LeChateau/XXXX-d?$jpeg-full$" alt="" />

    <!-- mobile -->
    <img class="banner__img banner__img--mobile"
      src="https://lechateau.scene7.com/is/image/LeChateau/XXXX-m?$jpeg-full$"  alt=""  />
  </section>
```


### Text

Need to add a `banner__holder` div following by a `banner__text` div. This will but the text in the middle horizontally and vertically. <br>
Add `banner__text--left` or `banner__text--right` to display the text on the left or on the right. The text will now be 50% wide. 

<br>

Elements 
- `banner__title` is the title of the banner. The font is DidotRoman, size is 35px and is all in uppercase, by default the color is black. 
- `banner__blur` is text below the title. Font-size is 14px and font is 'GothamBook'

<br>

Modifiers 
- `--mobile` only show in mobile (> 591px is breakpoint for banners)
- `--desktop` only how in desktop (< 591px)
- `--white` change text-color for white
- `--black` change text-color for black
- `--lowercase` for lowercase
- `--capitalize` to capitalize
- `--none` keep text as is 
- `--align-left` text-align left
- `--align-right` text-align right
- `--align-center` text-align center

<br>

``` html
   <!-- text over-->
    <div class="banner__holder banner__holder--desktop">
      <div class="banner__text banner__text--right">
        <h1 class="banner__title">Chandails et cardigans</h1>
        <h1 class="banner__title banner__title--lowercase">essentiels</h1>
          <p class="banner__blur">
            Au palmarès tricots. Ces chandails tendance sont ultra-polyvalents.
          </p>
      </div>
    </div>
```
<br>

### SEO Banners

Seo banners are simple text without any images. These are the default banner that should be added to a category.

``` html
<!-- Category Banner -->
  <section class="banner">
    <div class="banner__seo">
      <h1 class="banner__seo__title">
        PROM DRESSES
      </h1>
    </div>
  </section>
```  

<br>

### Pricepoint

Pricepoint banners are text banners that contain generally the name of the category + a price or percentage point on it. <br>
They can have a category name, a title, details, price or % and blur text. <br>
Text by default is black `pricepoint--black`, but can also be white with modifier `pricepoint--white`

Elements 
- `pricepoint__title` usually the main category (ex: Clearance, Outlet...), but they can be anything. (h2)
- `pricepoint__catName` usually name of the category (Skirts, Dress, ...), (h1)
- `pricepoint__detail` detail line at the bottom. A `span` as a child element will be underline. 
- `pricepoint__number` the main number, a percentage or price 
- `pricepoint__subNumber` the sub number, usually a price cent (like .99) 
- `pricepoint__symbol` the symbol (% or $)

Modifiers
- `--white` text-color: white
- `--black` text-color: black (by default)


Themes 
Add a modifiers to the `pricepoint` parent.
- `--outlet` used on Outlet
- `--sale` used on Sale
- `--clearance` use on Clearance


**[⬆ back to top](#table-of-contents)**

<br><br>

## Scripts

### Global variables and functions
- `raf` = window.requestAnimationFrame, to use for animation. 
- `getCatId()` = return the category id
- `checkDevice()` = return if device(true) or not(false)
- `lciLocale` = return the locale of the current page. Call the `getCurrentStoreLocale()` function.

<br><br>

## Ticker
Ticker is on the sitewide part of the site. It can be use to show promotional messages. <br>
It's locate on the HomeBannerBelow in BCC.<br>

The js code is at the adress : 
<br>
https://static.lechateau.com/css/lci/ticker/v1/lc-ticker.min.js
<br><br>
The structure of the slider is :
```html 
<!-- TICKER -->
<div class="ticker__wrap">
<div id="lcTicker" class="ticker__inner">
<ul class="ticker__slide__wrap">
    <li class="ticker__slide">
    <div class="ticker__slide__inner">
    <h3 class="ticker__title">$5 FLAT RATE SHIPPING ON ORDERS $100+.</h3>
    <a class="ticker__link" title="Shipping Terms" href="https://www.lechateau.com/style/html/terms/shipping/5dollarflatrate100_2017_en.html" target="_blank" onfocus='this.blur()' onclick="NewWindow(this.href,'mywin','320','193','yes','center');return false"> 		               Details 		               </a></div>
    </li>
</ul>
</div>
</div>
```
The shipping slide is the default one and should be placed as the static one, there are differents in all 3 locales with differents terms. 

<br><br>
Thoses styles need to be added  :
```html
<style type="text/css">
          .ticker__slide__inner {
            opacity: 1;
          }
          .ticker__inner * { font-size: 11px;}
          .ticker__link {text-transform: none;}
          
          /* Mobile fixes */
          @media (max-width: 591px) {
            .ticker__inner * { font-size: 10px;}
          }
          @media (max-width: 460px) {
            .ticker__inner * { font-size: 8px;}
          }
          .ticker__slide .emoji {display:inline-block; width:auto;}
        </style>
```

CSS elements :
- `ticker__link` : for a underline link
- `ticker__thumbnail` : for a small image (15px*15px)
- `ticker__title` : title
- `ticker__code` : coupon code in bold, as a click-to-clipboard function binded

<br><br>
The content of the carousel is a variable (tickerData) that contains an array of slides. Each slide a type and a locale (usually en or fr, but can be evrything). The locale is what is use in the `lcTicker` function.<br>

<br>
Each slide has within them objects. Those objects are components of the slide. They need to have a <b>type</b> and a <b>locale</b>.
<br><br>
The type can be : 

- `code` : html regular code (recommended)
- `cta` : for a cta (need link object (href, target, details, locale))
- `title` : title, need text in locale
- `text` : text, need text in locale ( ex: {type:'text', en:'text here'} )
- `thumbnail` : small image


Exemple : 
```js
var tickerData = [


// slide start
[
    {
     "type": "code",
        "fr": "50 $ de rabais sur les robes  ➡ <a class='ticker__link' href='https://www.lechateau.com/style/jump/Promo/category/cat47990708' title='Économisez maintenant'>ÉCONOMISEZ</a>",
        "en": "$50 OFF Select Dresses ➡ <a class='ticker__link' href='https://www.lechateau.com/style/jump/Promo/category/cat47990708' title='Save now'>SAVE NOW</a>"
    }
],
// slide end


// slide start
[
    {
     "type": "code",
        "fr": "Hauts pour hommes: -25$ sur achat 75$+ avec code POURPAPA ➡ <a class='ticker__link' href='https://www.lechateau.com/style/jump/Promo/category/cat47980719' title='Économisez maintenant'>ÉCONOMISEZ</a>",
        "en": "All Men’s Tops: $25 Off $75, Use Code: ALL4DAD  ➡ <a class='ticker__link' href='https://www.lechateau.com/style/jump/Promo/category/cat47980719' title='Save now'>SAVE NOW</a>"
    }
],
// slide end


// slide start
[
   {
      "type": "title",
        "en": "$5 FLAT RATE SHIPPING ON ORDERS $100+."
    },
	
    {
    		"type": "cta",
		    "en": "Details",
		    "link" : {
			    "href": "https://www.lechateau.com/style/html/terms/shipping/5dollarflatrate100_2017_en.html",
			    "en": "Read the Shipping Terms",
			  "target": "_blank",
			  "details": true
		}
    },
]
// slide end


];
```

<br><br>
This code start the sider :
```html
 <!-- Ticker Code --> 
 <script>
  $(window).load(function(){
    try {
      lcTicker('#lcTicker', 'en'); // fr for French  
    } catch(err) {
      console.log(err);
    }
    $(".ticker__slide__inner").animate({opacity: 1}, 500);
  });
  </script>
```

<br><br>

## Carousel

Carousel is dependent on the [Slick Plugin]('https://kenwheeler.github.io/slick/'). The plugin is already loaded on the header of BCC (HomeBannerAbove), there's a js file
-(https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js) and css file - (https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css). Current version is `@1.8.1`.
<br><br>
For smaller page, style='max-width:815px' need to be added to the `row--carousel`. 

``` html
<!-- START SLIDER -->
		<div class="row row--carousel" style="margin-top:40px;">
			<div class="carousel" id="sliderPromo">
				
				
				<!-- Slide 1-->
				<div class="carousel__slide">
					<a href="https://www.lechateau.com/style/jump/Promo/category/cat47990708" title="Shop The Promotion">
						<picture>
							<!--[if IE 9]><audio><![endif]-->
							<!-- Mobile -->
							<source media="(max-width: 768px)" srcset="https://lechateau.scene7.com/is/image/LeChateau/banner-drespromo-060420-en-m?$jpeg-prog$" />
							<!-- Desktop -->
							<source media="(min-width:  768px)" srcset="https://lechateau.scene7.com/is/image/LeChateau/banner-drespromo-060420-en-d-815?$jpeg-prog$" />
							<!--[if IE 9]></audio><![endif]-->
							<img 
							class="carousel__img"
							src="https://lechateau.scene7.com/is/image/LeChateau/banner-drespromo-060420-en-m?$jpeg-prog$" 
							alt="Shop The Promotion" 
							decoding="async" /> 
						</picture>
					</a>
				</div>
				
			
				<!-- Slide 2-->
				<div class="carousel__slide">
					<a href="https://www.lechateau.com/style/jump/Promo/category/cat47980719" title="Shop The Promotion">
						<picture>
							<!--[if IE 9]><audio><![endif]-->
							<!-- Mobile -->
							<source media="(max-width: 768px)" srcset="https://lechateau.scene7.com/is/image/LeChateau/banner-fathersdaypromo-020620-en-m?$jpeg-prog$" />
							<!-- Desktop -->
							<source media="(min-width:  768px)" srcset="https://lechateau.scene7.com/is/image/LeChateau/banner-fathersdaypromo-020620-en-d-815?$jpeg-prog$" />
							<!--[if IE 9]></audio><![endif]-->
							<img 
							class="carousel__img"
							src="https://lechateau.scene7.com/is/image/LeChateau/banner-fathersdaypromo-020620-en-m?$jpeg-prog$" 
							alt="Shop The Promotion" 
							decoding="async" /> 
						</picture>
					</a>
				</div>

			</div>

			<div id="arrowsPromo">
				<div>&#160;</div>
			</div>
			<div id="dotsPromo" class="carousel__dots">&#160;</div>

		</div>
		<!-- END  - SLIDER -->
```

<br><br>
The following script need to be added at the bottom :<br>
For more information on the possible settings of the script :  [See documentation]('https://kenwheeler.github.io/slick/')

``` html
  <script type="text/javascript">
	  

		$(document).ready(function(e) {



		$('#sliderPromo').slick({
				autoplay: true,
				autoplaySpeed: 4500,
				dots: true,
				arrows: true,
				infinite: true,
				appendDots: '#dotsPromo',
				lazyLoad: 'ondemand',
				speed: 400,
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: true,
				variableWidth: true,
				draggable: true,
				swipeToSlide: true,
				touchMove: true,
				prevArrow: '<button type="button" class="carousel__arrows carousel__arrows--prev">&nbsp;</button>',
				nextArrow: '<button type="button" class="carousel__arrows carousel__arrows--next">&nbsp;</button>',
				adaptiveHeight: true,

				responsive: [{
						breakpoint: 1500,
						settings: {
							variableWidth: true,
							centerMode: true,
							adaptiveHeight: true,
							slidesToShow: 1,
						}
					},

					{
						breakpoint: 1025,
						settings: {
							variableWidth: false,
							centerMode: false,
							slidesToShow: 1,
						}
					}
				]
		});
	});
  </script>
```

<br><br>

The arrows can be removed within the script or by adding this snippet of css and changing the url image.
```css
.carousel__arrows--prev {
			background-image: url('https://lechateau.scene7.com/is/image/LeChateau/arrow-181116-left?$png-full$&qlt=94&ver=1.0') ;
		}
		
		.carousel__arrows--next {
			background-image: url('https://lechateau.scene7.com/is/image/LeChateau/arrow-181116-right?$png-full$&qlt=94&ver=1.0') ;
		}
```
<br><br>

## Deployment
The path is 
https://www.lechateau.com/style/css/lci/@version/lci.combined.css

The CDN path will be 


Only put the 


Adding the preload along the regular `<style>` tag.
``` html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">
```

## Gulp

Task to run to complile scss into css and minified file <br>

- gulp styles
- gulp prod-css

<br>

Task to run to complile js files and minified files <br>

- gulp js
- gulp prod-js


## Git

To deploy project if on master branch

- git add . or selected files
- git commit -m "<NAME>"
- git push origin master

### References
https://github.com/airbnb/css#syntax <br>
https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/ <br>
https://devhints.io/sass <br>
https://css-tricks.com/bem-101/ <br>
https://en.bem.info/ <br>
https://www.freecodecamp.org/news/web-fonts-in-2018-f191a48367e8/<br>
https://developer.mozilla.org/fr/docs/Web/HTML/Pr%C3%A9charger_du_contenu<br>