   var ITEManimate = {
    start: 0,
    bezier: function (p0, p1, p2, p3) {
      return ITEManimate.polyBez([p0, p1], [p2, p3]);
    },
    polyBez: function (p1, p2) {
      var A = [null, null],
        B = [null, null],
        C = [null, null],
        bezCoOrd = function (t, ax) {
          (C[ax] = 3 * p1[ax]),
            (B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax]),
            (A[ax] = 1 - C[ax] - B[ax]);
          return t * (C[ax] + t * (B[ax] + t * A[ax]));
        },
        xDeriv = function (t) {
          return C[0] + t * (2 * B[0] + 3 * A[0] * t);
        },
        xForT = function (t) {
          var x = t,
            i = 0,
            z;
          while (++i < 14) {
            z = bezCoOrd(x, 0) - t;
            if (Math.abs(z) < 1e-3) break;
            x -= z / xDeriv(x);
          }
          return x;
        };
      return function (t) {
        return bezCoOrd(xForT(t), 1);
      };
    }
  };
  
  //CUSTOM JS CODE
  (function ($) {
    "use strict";
  
    //VIEWPORT
    var w = $(window);
  
    //ANIMATION
    var animationTrigger = $(".trigger");
    var sceneContainer = $(".slide-wrapper");
    var smallCircles = $(".small-circle");
    var portfolioContainer = $(".portfolio-wrapper");
  
    var main = {
      init: function () {
        var self = this;
        //GSAP ANIMATE
        main.animate();
      },
  
      //GSAP ANIMATION
      animate: function () {
        //OPEN
        function openAnimation() {
          TweenMax.to(sceneContainer, 0.8, {
            height: "100%",
            ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
            top: "0%",
            ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
            width: "100%",
            ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
            left: "0%",
            ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
  
            onComplete: function () {
              console.log(sceneContainer);
              TweenMax.to(portfolioContainer, 1.8, {
                width: "100%",
                ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815),
                top: "30%",
                ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815)
              });
              TweenMax.to(sceneContainer, 0.8, {
                top: "-70%",
                ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815)
              });
            }
          });
  
          TweenMax.to(smallCircles, 0.4, {
            scale: "0",
            ease: ITEManimate.bezier(0.93, 0.035, 0.35, 0.815)
          });
        }
  
        //CLOSE
        function closeAnimation() {
          TweenMax.to(portfolioContainer, 1.2, {
            top: "100%",
            ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
            width: "100%",
            ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
  
            onComplete: function () {
              TweenMax.to(sceneContainer, 0.8, {
                height: "90%",
                ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
                top: "5%",
                ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
                width: "90%",
                ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
                left: "5%",
                ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93),
                onComplete: function () {
                  TweenMax.to(smallCircles, 0.4, {
                    scale: "1",
                    ease: ITEManimate.bezier(0.815, 0.035, 0.35, 0.93)
                  });
                }
              });
            }
          });
        }
  
        animationTrigger.click(function () {
          if ($(this).attr("data-toggle") == "closed") {
            $(this).attr("data-toggle", "opened");
            openAnimation();
          } else if ($(this).attr("data-toggle", "opened")) {
            $(this).attr("data-toggle", "closed");
            closeAnimation();
          }
        });
      }
    };
  
    $(window).resize(function () {});
    return main.init();
  })($);
  