

// initial function
function lcTicker(selector, lang) {
    var parent = document.querySelector(selector),
        wrap = "<ul class='ticker__slide__wrap'>",
        nbSlides = 0; // if any feed

    if (tickerData) {
        // for each slides
        for (var n = 0; n < tickerData.length; n++) {
            var code = templateSlideByOrder(tickerData[n], lang);
            if (code) {
                wrap += code;
                nbSlides++;
            } else {
                console.warn("Slide " + Number(n + 1) + " missed arguments, wasn't added");
            }
        } //@end loop each news

        wrap += "</ul>";


        if (nbSlides >= 1) {
            parent.innerHTML = wrap; // init the ticker
            $(selector).vTicker();
        } else {
            console.warn("No slides was valid for the ticker. It will show default");
        }

    } else {
        console.log("No data for ticker. Default will be display");
    }
}



function templateSlideByOrder(slide, lang) {
   
    lang = lang || "en";
    // structure slide
    var innerText = "";

    for (var i = 0; i < slide.length; i++) {
        var obj = slide[i];

        switch (obj.type) {
            case "code": {
                if (obj[lang]) {
                    innerText += obj[lang];
                } else {
                    console.warn("Nothing was provided for slide with type code in " + lang + ". ");
                    return;
                }
                break;
            }

            case "title":
            case "text": {
                innerText += '<h3 class="ticker__title">' + obj[lang] + "</h3>"; // title
                break;
            }

            case "cta": {
                // code block

                if (!obj.link) {
                    console.warn("No links was provided for CTA : " + obj[lang] + ". ");
                    innerText += '<span class="ticker__text">' + obj[lang] + '</span>';
                    break;
                }
                else if (!obj.link.href) {
                    console.warn("The href property wasn't provided for CTA : " + obj[lang] + ". ");
                    innerText += '<span class="ticker__text">' + obj[lang] + '</span>';
                    break;
                } else {
                    var alt = obj.link[lang] || "";
                    var target = obj.link.target || "_parent";
                    if (alt === "") {
                        console.warn("No title tag was provided for CTA : " + obj[lang] + ". ");
                    }
                    if(obj.link.details === true) {
                        innerText +=
                        '<a class="ticker__link" title="' +
                        alt +
                        '" href="' +
                        obj.link.href +
                        '" onfocus="this.blur()" onclick="legalWindow(\''+obj.link.href+'\',\'mywin\',\'320\',\'193\',\'yes\',\'center\');return false">';
                        innerText += obj[lang] + "</a>"; // title
                    } else {
                        innerText +=
                        '<a class="ticker__link" title="' +
                        alt +
                        '" href="' +
                        obj.link.href +
                        '" target="' + target + '">';
                    innerText += obj[lang] + "</a>"; // title
                    }
                    
                }

                break;
            }

            case "thumbnail": {

                if (!obj.url) {
                    console.warn("No URL was provided for the icon");
                    innerText += "";
                } else {
                    innerText += '<img class="ticker__thumbnail" src="' + obj.url + '"/>';
                }
                break;
            }

            default: {
                break;
            }
            // code block
        }
    }

    // final check there's no undefined 
    if (innerText.indexOf("undefined") !== -1) {
        console.warn('Something was undefined on the slide below');
        console.log(innerText);
        return;
    }

    var wrap = "";
    wrap += "<li class='ticker__slide'>";
    wrap += "<div class='ticker__slide__inner'>";
    wrap += innerText;
    wrap += "</div></li>";
    return wrap;
}


function showDefault(lang) {
    if (typeof tickerData === "undefined") {
        var wrap = "<ul class='ticker__slide__wrap'>";
        wrap +=
            "<li class='ticker__slide'><div class='ticker__slide__inner'>" +
            defaultTickerText +
            "</div></li>";
        wrap += "</ul>";
        $("#ticker").html(wrap);
    } else {
        var wrap = "<ul class='ticker__slide__wrap'>";
        var r = tickerData[0];
        var link = tickerData[0].link;
        var l = link.href;
        var s = link.altENG; // put the image if any

        try {
            var o =
                '<img class="ticker__thumbnail" src="' +
                tickerData[0].media$thumbnail.url +
                '"/>';
        } catch (t) {
            var o = "";
        }

        var title = tickerData[0].title.textENG,
            bottomLine = tickerData[0].bottom.textENG;
        wrap +=
            "<li class='ticker__slide'><div class='ticker__slide__inner'>" +
            o +
            '<h3 class="ticker__title">' +
            title +
            '</h3><div class="ticker__meta"><span class=""><a class="ticker__link" title="' +
            s +
            '" href="' +
            l +
            '">' +
            bottomLine +
            "</a></span></div></div></li>";
        wrap += "</ul>";
        $("#ticker").html(wrap);
    }
}


//-------------------------------------------------

function _typeof2(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof2 = function _typeof2(obj) {
            return typeof obj;
        };
    } else {
        _typeof2 = function _typeof2(obj) {
            return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof2(obj);
}


function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
        _typeof = function _typeof(obj) {
            return _typeof2(obj);
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : _typeof2(obj);
        };
    }

    return _typeof(obj);
}

!(function (t) {
    var e = {
        speed: 900,
        pause: 4e3,
        showItems: 1,
        mousePause: !0,
        height: 0,
        animate: !0,
        margin: 0,
        padding: 0,
        startPaused: !1
    },
        i = {
            moveUp: function moveUp(t, e) {
                i.animate(t, e, "up");
            },
            moveDown: function moveDown(t, e) {
                i.animate(t, e, "down");
            },
            animate: function animate(e, i, a) {
                var n = e.itemHeight,
                    r = e.options,
                    s = e.element,
                    l = s.children("ul"),
                    o = "up" === a ? "li:first" : "li:last";
                s.trigger("vticker.beforeTick");
                var u = l.children(o).clone(!0);

                if (
                    (0 < r.height && (n = l.children("li:first").height()),
                        (n += r.margin + 2 * r.padding),
                        "down" === a && l.css("top", "-" + n + "px").prepend(u),
                        i && i.animate)
                ) {
                    if (e.animating) return;
                    (e.animating = !0),
                        l.animate(
                            "up" === a
                                ? {
                                    top: "-=" + n + "px"
                                }
                                : {
                                    top: 0
                                },
                            r.speed,
                            function () {
                                t(l)
                                    .children(o)
                                    .remove(),
                                    t(l).css("top", "0px"),
                                    (e.animating = !1),
                                    s.trigger("vticker.afterTick");
                            }
                        );
                } else
                    l.children(o).remove(),
                        l.css("top", "0px"),
                        s.trigger("vticker.afterTick");

                "up" === a && u.appendTo(l);
            },
            nextUsePause: function nextUsePause() {
                var e = t(this).data("state"),
                    i = e.options;
                e.isPaused ||
                    2 > e.itemCount ||
                    a.next.call(this, {
                        animate: i.animate
                    });
            },
            startInterval: function startInterval() {
                var e = t(this).data("state"),
                    a = this;
                e.intervalId = setInterval(function () {
                    i.nextUsePause.call(a);
                }, e.options.pause);
            },
            stopInterval: function stopInterval() {
                var e = t(this).data("state");
                e &&
                    (e.intervalId && clearInterval(e.intervalId),
                        (e.intervalId = void 0));
            },
            restartInterval: function restartInterval() {
                i.stopInterval.call(this), i.startInterval.call(this);
            }
        },
        a = {
            init: function init(n) {
                a.stop.call(this);
                var r = jQuery.extend({}, e);
                n = t.extend(r, n);
                var r = t(this),
                    s = {
                        itemCount: r.children("ul").children("li").length,
                        itemHeight: 0,
                        itemMargin: 0,
                        element: r,
                        animating: !1,
                        options: n,
                        isPaused: n.startPaused ? !0 : !1,
                        pausedByCode: !1
                    };
                t(this).data("state", s),
                    r
                        .css({
                            overflow: "hidden",
                            position: "relative"
                        })
                        .children("ul")
                        .css({
                            position: "absolute",
                            margin: 0,
                            padding: 0
                        })
                        .children("li")
                        .css({
                            margin: n.margin,
                            padding: n.padding
                        }),
                    isNaN(n.height) || 0 === n.height
                        ? (r
                            .children("ul")
                            .children("li")
                            .each(function () {
                                var e = t(this);
                                e.height() > s.itemHeight && (s.itemHeight = e.height());
                            }),
                            r
                                .children("ul")
                                .children("li")
                                .each(function () {
                                    t(this).height(s.itemHeight);
                                }),
                            r.height(
                                (s.itemHeight + (n.margin + 2 * n.padding)) * n.showItems +
                                n.margin
                            ))
                        : r.height(n.height);
                var l = this;
                n.startPaused || i.startInterval.call(l),
                    n.mousePause &&
                    r
                        .bind("mouseenter", function () {
                            !0 !== s.isPaused &&
                                ((s.pausedByCode = !0),
                                    i.stopInterval.call(l),
                                    a.pause.call(l, !0));
                        })
                        .bind("mouseleave", function () {
                            (!0 !== s.isPaused || s.pausedByCode) &&
                                ((s.pausedByCode = !1),
                                    a.pause.call(l, !1),
                                    i.startInterval.call(l));
                        });
            },
            pause: function pause(e) {
                var i = t(this).data("state");

                if (i) {
                    if (2 > i.itemCount) return !1;
                    (i.isPaused = e),
                        (i = i.element),
                        e
                            ? (t(this).addClass("paused"), i.trigger("vticker.pause"))
                            : (t(this).removeClass("paused"), i.trigger("vticker.resume"));
                }
            },
            next: function next(e) {
                var a = t(this).data("state");

                if (a) {
                    if (a.animating || 2 > a.itemCount) return !1;
                    i.restartInterval.call(this), i.moveUp(a, e);
                }
            },
            prev: function prev(e) {
                var a = t(this).data("state");

                if (a) {
                    if (a.animating || 2 > a.itemCount) return !1;
                    i.restartInterval.call(this), i.moveDown(a, e);
                }
            },
            stop: function stop() {
                t(this).data("state") && i.stopInterval.call(this);
            },
            remove: function remove() {
                var e = t(this).data("state");
                e &&
                    (i.stopInterval.call(this), (e = e.element), e.unbind(), e.remove());
            }
        };

    t.fn.vTicker = function (e) {
        return a[e]
            ? a[e].apply(this, Array.prototype.slice.call(arguments, 1))
            : "object" != _typeof(e) && e
                ? void t.error("Method " + e + " does not exist on jQuery.vTicker")
                : a.init.apply(this, arguments);
    };
})(jQuery);