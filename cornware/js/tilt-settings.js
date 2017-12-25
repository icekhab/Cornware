(function() {
  var tiltSettings = [
  {},
  {
    movement: {
      imgWrapper : {
        translation : {x: 10, y: 10, z: 30},
        rotation : {x: 0, y: -10, z: 0},
        reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
      },
      lines : {
        translation : {x: 10, y: 10, z: [0,70]},
        rotation : {x: 0, y: 0, z: -2},
        reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
      },
      caption : {
        rotation : {x: 0, y: 0, z: 2},
        reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
      },
      overlay : {
        translation : {x: 10, y: -10, z: 0},
        rotation : {x: 0, y: 0, z: 2},
        reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
      },
      shine : {
        translation : {x: 100, y: 100, z: 0},
        reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
      }
    }
  },
  {
    movement: {
      imgWrapper : {
        rotation : {x: -5, y: 10, z: 0},
        reverseAnimation : {duration : 900, easing : 'easeOutCubic'}
      },
      caption : {
        translation : {x: 30, y: 30, z: [0,40]},
        rotation : {x: [0,15], y: 0, z: 0},
        reverseAnimation : {duration : 1200, easing : 'easeOutExpo'}
      },
      overlay : {
        translation : {x: 10, y: 10, z: [0,20]},
        reverseAnimation : {duration : 1000, easing : 'easeOutExpo'}
      },
      shine : {
        translation : {x: 100, y: 100, z: 0},
        reverseAnimation : {duration : 900, easing : 'easeOutCubic'}
      }
    }
  },
  {
    movement: {
      imgWrapper : {
        rotation : {x: -5, y: 10, z: 0},
        reverseAnimation : {duration : 50, easing : 'easeOutQuad'}
      },
      caption : {
        translation : {x: 20, y: 20, z: 0},
        reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
      },
      overlay : {
        translation : {x: 5, y: -5, z: 0},
        rotation : {x: 0, y: 0, z: 6},
        reverseAnimation : {duration : 1000, easing : 'easeOutQuad'}
      },
      shine : {
        translation : {x: 50, y: 50, z: 0},
        reverseAnimation : {duration : 50, easing : 'easeOutQuad'}
      }
    }
  },
  {
    movement: {
      imgWrapper : {
        translation : {x: 0, y: -8, z: 0},
        rotation : {x: 3, y: 3, z: 0},
        reverseAnimation : {duration : 1200, easing : 'easeOutExpo'}
      },
      lines : {
        translation : {x: 15, y: 15, z: [0,15]},
        reverseAnimation : {duration : 1200, easing : 'easeOutExpo'}
      },
      overlay : {
        translation : {x: 0, y: 8, z: 0},
        reverseAnimation : {duration : 600, easing : 'easeOutExpo'}
      },
      caption : {
        translation : {x: 10, y: -15, z: 0},
        reverseAnimation : {duration : 900, easing : 'easeOutExpo'}
      },
      shine : {
        translation : {x: 50, y: 50, z: 0},
        reverseAnimation : {duration : 1200, easing : 'easeOutExpo'}
      }
    }
  },
  {
    movement: {
      lines : {
        translation : {x: -5, y: 5, z: 0},
        reverseAnimation : {duration : 1000, easing : 'easeOutExpo'}
      },
      caption : {
        translation : {x: 15, y: 15, z: 0},
        rotation : {x: 0, y: 0, z: 3},
        reverseAnimation : {duration : 1500, easing : 'easeOutElastic', elasticity : 700}
      },
      overlay : {
        translation : {x: 15, y: -15, z: 0},
        reverseAnimation : {duration : 500,easing : 'easeOutExpo'}
      },
      shine : {
        translation : {x: 50, y: 50, z: 0},
        reverseAnimation : {duration : 500, easing : 'easeOutExpo'}
      }
    }
  },
  {
    movement: {
      imgWrapper : {
        translation : {x: 5, y: 5, z: 0},
        reverseAnimation : {duration : 800, easing : 'easeOutQuart'}
      },
      caption : {
        translation : {x: 10, y: 10, z: [0,50]},
        reverseAnimation : {duration : 1000, easing : 'easeOutQuart'}
      },
      shine : {
        translation : {x: 50, y: 50, z: 0},
        reverseAnimation : {duration : 800, easing : 'easeOutQuart'}
      }
    }
  },
  {
    movement: {
      lines : {
        translation : {x: 40, y: 0, z: 0},
        reverseAnimation : {duration : 1500, easing : 'easeOutElastic'}
      },
      caption : {
        translation : {x: 20, y: 0, z: 0},
        rotation : {x: 0, y: 0, z: -5},
        reverseAnimation : {duration : 1000, easing : 'easeOutExpo'}
      },
      overlay : {
        translation : {x: -30, y: 0, z: 0},
        rotation : {x: 0, y: 0, z: 3},
        reverseAnimation : {duration : 750, easing : 'easeOutExpo'}
      },
      shine : {
        translation : {x: 100, y: 0, z: 0},
        reverseAnimation : {duration : 750, easing : 'easeOutExpo'}
      }
    }
  }];

  function init() {
    [].slice.call(document.querySelectorAll('#portfolio a.tilter')).forEach(function(el, pos) {
      new TiltFx(el, tiltSettings[0]);
    });
    [].slice.call(document.querySelectorAll('#team a.tilter')).forEach(function(el, pos) {
      new TiltFx(el, tiltSettings[0]);
    });
  }
  let fullvw = document.documentElement.clientWidth || window.innerWidth || 0;
  if (fullvw > 1200) {
    // Preload all images.
    imagesLoaded(document.querySelector('section'), function() {
      document.body.classList.remove('loading');
      init();
    });
  }


  // REMOVE THIS!
  // For Demo purposes only. Prevent the click event.
/*  [].slice.call(document.querySelectorAll('a[href="#"]')).forEach(function(el) {
    el.addEventListener('click', function(ev) { ev.preventDefault(); });
  });
*/

})();