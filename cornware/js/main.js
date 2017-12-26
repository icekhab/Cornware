'use strict';

window.validateForm = function (inputs) {
  debugger
  let warnings = 0;
  for (let input of inputs) {
    let val = $(input).val().trim();

    if (input.required) {
      if (val === "") {
        alert("Все поля формы должны быть заполнены");
        event.preventDefault();
        warnings++;
        break;
      }
      if (input.type == "email") {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(val)) {
          alert("Введите корректный email");
          event.preventDefault();
          warnings++;
          break;
        }
      }
    }
  }
  return warnings === 0;
}

$("document").ready(function () {



  //-form validation

  var navMain = $(".navbar-top");
  navMain.on("click", "a", null, function () {
    navMain.find('.navbar-collapse').removeClass("in");
  });
  $(".navbar-inverse .navbar-toggle").click(function () {
    $(this).toggleClass("active");
  });
  let fullvw = document.documentElement.clientWidth || window.innerWidth || 0;
  if (fullvw > 1200) {
    let preloader = document.createElement("div"),
      ss = new CustomScrollSpy();
    $(preloader)
      .addClass("preloader")
      .html('<b>L<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>ADING</b>');
    $("body").append(preloader);

    $("#corn-arc").replaceWith("<div id='corn-arc' class='col-lg-5'>" + $("#corn-arc").html() + "</div>");
    let cornArc = $("#corn-arc");
    let newCornArc = cornArc[0].cloneNode(true);
    cornArc.remove();

    $("body").prepend(newCornArc);
    $("#corn-arc").after("<img id='anim-eclipse' class='col-lg-5' src='/images/eclipse.svg'/>");
    window.scrollTo(0, 0);

    /*-----------------item slider--------------------------------------------*/
    var teamTrack = $("#team .items .slider-container").silverTrack({
      perPage: 3,
      autoHeight: true
    });
    teamTrack.install(new SilverTrack.Plugins.Navigator({
      prev: $("#team .slider-controls .prev"),
      next: $("#team .slider-controls .next")
    }));
    teamTrack.start();
    $("#portfolio .slider-controls .counter .of").html($("#team .items .item").length / 3);
    $("#team .slider-controls .counter .of").html($("#team .items .item").length / 3);

    function pageIncrement(k, section, target) {
      var self = this;
      if (!$(target).hasClass("disabled")) {
        var prevVal = parseInt($(section + " .slider-controls .counter .number span").text());
        $(section + " .slider-controls .counter .number span").html(prevVal + 1 * k);
        $(target).off("click.increment");
        setTimeout(() => {
          $(target).on("click.increment", () => {
            pageIncrement(k, section, target);
          })
        }, 1000);
      }
    }

    $("#team .slider-controls .prev").on("click.increment", function () {
      pageIncrement(-1, "#team", this);
    });
    $("#team .slider-controls .next").on("click.increment", function () {
      pageIncrement(1, "#team", this);
    });
    $("#portfolio .slider-controls .prev").on("click.increment", function () {
      pageIncrement(-1, "#portfolio", this);
    });
    $("#portfolio .slider-controls .next").on("click.increment", function () {
      pageIncrement(1, "#portfolio", this);
    });

    var portfolioTrack = $("#portfolio .items .slider-container").silverTrack({
      perPage: 3,
      autoHeight: true
    });
    portfolioTrack.install(new SilverTrack.Plugins.Navigator({
      prev: $("#portfolio .slider-controls .prev"),
      next: $("#portfolio .slider-controls .next")
    }));
    portfolioTrack.start();
    /*-----------------item slider--------------------------------------------*/

    function applyDelayedSliding(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        $(nodes[i])

          .addClass("slide-to-right").removeClass("slide-to-right-out").css({
            "animation-delay": i * 0.07 + 1 + "s"
          });
      }
    }

    function applyCommonBehaviour(node) {
      let elm = $("#anim-eclipse")[0];
      let newone = elm.cloneNode(true);
      elm.parentNode.replaceChild(newone, elm);
      console.log("ANIM ECLIPSE REPLACED");
      /*$("#anim-eclipse").css({"animation-name": ""});
      $("#anim-eclipse").css({"animation-name": "eclipseScale"});*/
      $(node).css("display", "flex");
      applyDelayedSliding($(node + " .animated-row"));
    }
    function applyCommonHideBehaviour(selector) {
      let nodes = $(selector + " .animated-row");
      for (let i = 0; i < nodes.length; i++) {
        $(nodes[i])
          .removeClass("slide-to-right")
          .addClass("slide-to-right-out")
          .css({
            "animation-delay": i * 0.1 + "s"
          });
      }
      setTimeout(() => {
        $(selector).css("display", "none");
      }, 1000);

    }

    let justOpened = true;
    ss.addAction("#main", () => {

      applyCommonBehaviour("#main");
      if (justOpened) {
        $("#anim-eclipse").css({
          "animation-name": "eclipseScaleStart",
          "animation-duration": "1s"
        });
        justOpened = false;
      }
      setTimeout(() => {
        $("#corn-arc").css({
          'background-image': 'url("/images/arc.svg"), url("/images/kukuruza-1-optimized-laptop-mid.jpg")'
        });
      }, 1000);


      $(".navbar-top .navbar-brand").removeClass("fade-in").addClass("fade-out");
    });
    ss.addHideAction("#main", () => {
      console.log("hide main");
      $("#anim-eclipse").css({
        "animation-name": "eclipseScale",
        "animation-duration": "2s"
      });
      $(".navbar-top .navbar-brand").removeClass("fade-out").addClass("fade-in");
      applyCommonHideBehaviour("#main");
    });

    ss.addAction("#about-us", () => {
      setTimeout(() => {
        $("#corn-arc").css({
          'background-image': 'url("/images/arc.svg"), url("/images/photo-1469449660581-b1867dc87ebb.jpg")'
        });
      }, 1000);
      $("#about-us .contact-us").addClass("fade-in").removeClass("slide-to-right-out");
      applyCommonBehaviour("#about-us");
    });
    ss.addHideAction("#about-us", () => {
      console.log("hide about-us");
      $("#about-us .contact-us").removeClass("fade-in").addClass("slide-to-right-out");
      applyCommonHideBehaviour("#about-us");
    });

    ss.addAction("#portfolio", () => {
      setTimeout(() => {
        $("#corn-arc").css({
          'background-image': 'url("/images/arc.svg"), url("/images/field_3.jpg")'
        });
      }, 1000);
      $("#portfolio .slider-controls").addClass("fade-in").removeClass("slide-to-right-out");
      applyCommonBehaviour("#portfolio");
    });
    ss.addHideAction("#portfolio", () => {
      console.log("hide about-us");

      $("#portfolio .slider-controls").addClass("slide-to-right-out").removeClass("fade-in");
      applyCommonHideBehaviour("#portfolio");
    });

    ss.addAction("#team", () => {
      setTimeout(() => {
        $("#corn-arc").css({
          'background-image': 'url("/images/arc.svg"), url("/images/StockSnap_HQMMUYMHG3.jpg")'
        });
      }, 1000);

      $("#team .slider-controls").addClass("fade-in").removeClass("slide-to-right-out");

      applyCommonBehaviour("#team");
    });
    ss.addHideAction("#team", () => {
      console.log("hide about-us");
      $("#team .slider-controls").addClass("slide-to-right-out").removeClass("fade-in");
      applyCommonHideBehaviour("#team");
    });

    ss.addAction("#vacancies", () => {
      setTimeout(() => {
        $("#corn-arc").css({
          'background-image': 'url("/images/arc.svg"), url("/images/field_4.jpg")'
        });
      }, 1000);
      $("#vacancies .contact-us").addClass("fade-in").removeClass("slide-to-right-out");

      applyCommonBehaviour("#vacancies");
    });
    ss.addHideAction("#vacancies", () => {
      console.log("hide about-us");
      $("#vacancies .contact-us").removeClass("fade-in").addClass("slide-to-right-out");
      applyCommonHideBehaviour("#vacancies");
    });

    ss.addAction("#partners", () => {
      setTimeout(() => {
        $("#corn-arc").css({
          'background-image': 'url("/images/arc.svg"), url("/images/photo-1470769381602-0e6ad5ce7550.jpg")'
        });
      }, 1000);
      $("#partners .slider-controls").addClass("fade-in").removeClass("slide-to-right-out");
      applyCommonBehaviour("#partners");
    });
    ss.addHideAction("#partners", () => {
      console.log("hide about-us");
      $("#partners .slider-controls").addClass("slide-to-right-out").removeClass("fade-in");
      applyCommonHideBehaviour("#partners");
    });

    ss.addAction("#contacts", () => {
      setTimeout(() => {
        $("#corn-arc").css({
          'background-image': 'url("/images/arc.svg"), url("/images/field_3.jpg")'
        });
      }, 1000);
      $("#contacts .contact-us").addClass("fade-in").removeClass("slide-to-right-out");
      applyCommonBehaviour("#contacts");
    });
    ss.addHideAction("#contacts", () => {
      console.log("hide about-us");
      $("#contacts .contact-us").removeClass("fade-in").addClass("slide-to-right-out");
      applyCommonHideBehaviour("#contacts");
    });

    ss.addAction("#feedback", () => {
      setTimeout(() => {
        $("#corn-arc").css({
          'background-image': 'url("/images/arc.svg"), url("/images/field_4.jpg")'
        });
      }, 1000);
      $(".navbar-top .navbar-right, body > footer, .navbar-left").removeClass("fade-in").addClass("fade-out");

      $("#feedback .contact-us").addClass("fade-in").removeClass("slide-to-right-out");
      applyCommonBehaviour("#feedback");
    });
    ss.addHideAction("#feedback", () => {
      console.log("hide about-us");
      $(".navbar-top .navbar-right, body > footer, .navbar-left").removeClass("fade-out").addClass("fade-in");
      $("#feedback .contact-us").removeClass("fade-in").addClass("slide-to-right-out");
      applyCommonHideBehaviour("#feedback");
    });

    $('body').imagesLoaded({ background: true }, function () {
      $(".preloader").fadeOut(500);
      ss.init();
      new SlideAnimationHandler();
      $(".navbar-top .navbar-right, body > footer, .navbar-left").addClass("fade-in").css({
        "animation-delay": "1s"
      });
    });
    console.log($("#anim-eclipse").width());
    $("body").click(function (event) {
      console.log(event.clientX);
    });

    class SlideAnimationHandler {
      constructor() {
        //16 - root font size, 1 rem
        //ecc - elipseCenterCoords
        this.elipseWidth = $("#anim-eclipse").width();
        let remSize = parseInt($("html").css("font-size")),
          sliderControlsOffsetLeft = document.documentElement.clientWidth * (1 - 0.27),
          controlsWrapOffset = 5.2 * remSize,
          buttonOffset = ((0.7 + 0.55 + 0.812) / 2 + 1) * remSize,
          cornArcWidth = document.documentElement.clientWidth * 0.387,
          elipseTargetWidth = 0,
          animation = {
            start: {
              scaleX: 1,
              scaleY: 1,
              translateX: 0
            },
            finish: {
              scaleX: 1,
              scaleY: 1,
              translateX: 0
            }
          };


        this.initialECC = $("#anim-eclipse").offset().left + this.elipseWidth * (1 - 0.163841808);
        this.startECC = sliderControlsOffsetLeft + controlsWrapOffset + buttonOffset;
        let startEccOffset = this.startECC - this.initialECC;
        animation.start.translateX = startEccOffset;
        animation.start.scaleY = 1 + ($("#corn-arc").offset().left - ($("#anim-eclipse").offset().left + startEccOffset)) / this.elipseWidth;


        this.finishECC = document.documentElement.clientWidth * (1 - 1 * 0.387 * (1 - 0.96));
        let finishEccOffset = this.finishECC - this.startECC;
        elipseTargetWidth = this.elipseWidth + finishEccOffset;

        animation.finish.translateX = (startEccOffset + finishEccOffset) / 2.3;
        animation.finish.scaleX = elipseTargetWidth / this.elipseWidth;
        animation.finish.scaleY = elipseTargetWidth / this.elipseWidth + 0.5;

        console.log(this.initialECC);
        console.log(this.elipseWidth);
        console.log(this.startECC);
        $("body").prepend(
          `
          <style>
            @-webkit-keyframes eclipseScaleStart {
              0% {
                transform: scaleY(${animation.finish.scaleY}) scaleX(${animation.finish.scaleX}) translateX(${animation.finish.translateX}px);              }
              100% {
                transform: scaleY(${animation.start.scaleY}) scaleX(${animation.start.scaleX}) translateX(${animation.start.translateX}px);
              }
            }
            @-webkit-keyframes eclipseScale {
              0% {
                transform: scaleY(${animation.start.scaleY}) scaleX(${animation.start.scaleX}) translateX(${animation.start.translateX}px);
              }
              50% {
                transform: scaleY(${animation.finish.scaleY}) scaleX(${animation.finish.scaleX}) translateX(${animation.finish.translateX}px);
              }
              100% {
                transform: scaleY(${animation.start.scaleY}) scaleX(${animation.start.scaleX}) translateX(${animation.start.translateX}px);
              }
            }
          </style>
          `
        );
      }

    }
  }
});
