'use strict';
class CustomScrollSpy {
  constructor() {
    let self = this;
    console.log("CustomScrollSpy created");

    this.targets = [];
    this.currentSlide = "";
    this.prevSlide = "";
    let scrollspyTarget = $("body")
                  .attr("data-scrollspy-target")
                  .split(",")
                  .map((x) => {
                    return x.trim();
                  });

    let $targetHrefs = $(scrollspyTarget.map((x) => {
      return x + " a"
    }).join());
    for (let i = 0; i < $targetHrefs.length; i++) {
      this.targets.push($targetHrefs[i].href.match(/\#([a-zA-Z0-9_-]+)?/)[0]);
    }
    this.targets.push("#feedback");
    //console.log($targetHrefs);
    console.log(this.targets);

    function switchSlide(event) {
      let slideNodeId = event.data.slideNodeId,
          scrollableContainer = $(event.currentTarget).find(".container");
      console.log(event.deltaX, event.deltaY, event.deltaFactor);
      console.log(event.currentTarget);
      console.log("scrolltop:", scrollableContainer.scrollTop());
      console.log("winh:", $(window).height());
      console.log("st + wh:", scrollableContainer.scrollTop() + $(window).height());
      console.log("cont oh:", scrollableContainer.outerHeight());
      console.log("WOOOP", self.targets[slideNodeId].selector);

      if (self.targets[slideNodeId].selector == "#feedback") return false;

      if(event.deltaY > 0 && scrollableContainer.scrollTop() == 0) {
        if (slideNodeId > 0) {
          //prev slide
          let node = self.targets[slideNodeId-1].selector;
            $(`.navbar-right a[href='${node}']`).click();
            //self.show(node);
            $("section" + node).off("mousewheel");
            setTimeout(()=> {
              $("section" + node).on("mousewheel", {slideNodeId: slideNodeId-1}, switchSlide);
            }, 2000);
        }
      } else if (scrollableContainer.scrollTop() + $(window).height() == scrollableContainer.prop("scrollHeight")) {
        //next slide
        let node = self.targets[slideNodeId+1].selector;
          //self.show(node);
          $(`.navbar-right a[href='${node}']`).click();
          $("section" + node).off("mousewheel");
          setTimeout(()=> {
            $("section" + node).on("mousewheel", {slideNodeId: slideNodeId+1}, switchSlide);
          }, 2000);
      }
    }

    for (let i = 0; i < this.targets.length; i++) {
      $("section" + this.targets[i]).on("mousewheel", {slideNodeId: i}, switchSlide);
    }

    this.targets = this.targets.map((target)=>{
      let params = {
        selector: target,
        offsetTop: $(target).offset().top,
        hideActionsList: [],
        actionsList: [() => {
          $($targetHrefs).parents("li").removeClass("active");
          $(`a[href='${target}']`).parents("li").addClass("active");
        }]
      };

      $(`a[href='${target}']`).click((event) => {
        let link = $(`.navbar-right a[href='${target}']`),
            linePosition;
        if ($(event.target).hasClass("navbar-brand") || $(event.target).parent().hasClass("navbar-brand")) {
          linePosition = -32;
        } else {
          linePosition = link.offset().left - $(".navbar-right").offset().left + 16;
        }

        $(".navbar-top .navbar-right").css("background-position", linePosition + "px bottom");
        this.show(target);
        return false;
      });
      return params;
    });
    //console.log(this.targets);
    $(".contact-us").click(() => {
      this.show("#feedback");
    });
    $("#feedback .get-back").click(() => {
      this.hide("#feedback");
      this.show("#main");
    });
  }
  init() {
    console.log("CustomScrollSpy initialized");
    this.show(this.targets[0].selector);
  }
  hide() {
    console.log("--h-start--");
    console.log("prev:", this.prevSlide);
    console.log("current:", this.currentSlide);
    if (this.prevSlide !== "") {
      for (let i = 0; i < this.targets.length; i++) {
        if (this.targets[i].selector === this.prevSlide) {
          console.log("hiding " + this.prevSlide);
          for (let action of this.targets[i].hideActionsList) {
            action();
          }
        }
      }
    }
  }
  showPrev() {
    this.show(this.prevSlide);
  }
  show(id) {
    if (id !== this.currentSlide) {
      this.hide();
      console.log(id);
      this.currentSlide = id;
      for (let i = 0; i < this.targets.length; i++) {
          if (this.targets[i].selector === this.currentSlide) {
            let target = this.targets[i];
            console.log("show events on ", id);
            setTimeout(()=>{
              for (let action of target.actionsList) {
                action();
              }
            }, 100);
            this.prevSlide = this.currentSlide;
            console.log("--s-end--");
            break;
          }
        }
    }
  }
  addAction(selector, actionfunc) {
    for (let target of this.targets) {
      if (target.selector == selector) {
        target.actionsList.push(actionfunc);
      }
    }
  }
  addHideAction(selector, action) {
    for (let target of this.targets) {
      if (target.selector == selector) {
        target.hideActionsList.push(action);
      }
    }
  }
}
