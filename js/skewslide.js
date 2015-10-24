
$(function() {
  function toDeg(rad) {
    return rad/Math.PI * 180;
  }
  var DURATION = 1000; //ms
  var container = $(".mask-container")
  var img = $(".container img");
  var img_height = img.height();
  var img_width = img.width();
  if (Modernizr.csstransforms && Modernizr.requestanimationframe) {
    effect_high();
  } else {
    effect_low();
  }
  var effect_low = function() {
    var masks = container.find(".mask-low");
    masks.each(function() {
      var $this = $(this);
      $this.width(img_width).height(img_height/2);
      if ($this.hasClass("above")) {
        $this.css({
          top: -img_height/2 + "px",
          left: 0,
        })
      }
      if ($this.hasClass("under")) {
        $this.css({
          bottom: -img_height/2 + "px",
          left: 0,
        })
      }
    })
    container.on("mouseenter", function() {
      var masks = $(this).find(".mask-low");
      masks.each(function() {
        var $this = $(this);
        if ($this.hasClass("above")) {
          $this.animate({
            top: 0
          }, DURATION)
        }
        if ($this.hasClass("under")) {
          $this.animate({
            bottom: 0
          }, DURATION)
        }
      })
    })
    container.on("mouseleave", function(){
      var masks = $(this).find(".mask-low");
      masks.each(function() {
        if ($this.hasClass("above")) {
          $this.animate({
            top: -img_height/2 + "px",
          }, DURATION)
        }
        if ($this.hasClass("under")) {
          $this.animate({
            bottom: -img_height/2 + "px",
          }, DURATION)
        }
      })
    })
  }
  // ==============
  var effect_high = function() {
    var alpha = undefined;
    if (img_height > 0 && img_width > 0) {
      alpha = Math.atan(img_height/img_width);
    }
    if (alpha !== undefined) {
      var masks = container.find(".mask-high");
      var mask_height = img_height/Math.sin(alpha);
      var mask_width = Math.sin(alpha)*img_width;
      var offset = Math.cos(alpha)*img_width;
      transformOriginName = Modernizr.prefixed("transformOrigin");
      transformName = Modernizr.prefixed("transform");
      masks.each(function() {
        var $this = $(this);
        $this.height(mask_height).width(0);
        var css_obj = {};
        if ($this.hasClass("lt")) {
          css_obj = {};
          css_obj[transformOriginName] = "0 "+offset+"px";
          css_obj[transformName] = "rotate("+ toDeg(Math.PI/2 - alpha) +"deg)";
          css_obj.top = -offset+"px";
          $this.css(css_obj);
        }
        if ($this.hasClass("rt")) {
          css_obj = {};
          css_obj[transformOriginName] = "0 "+(mask_height - offset)+"px";
          css_obj[transformName] = "rotate("+ toDeg(Math.PI/2 + alpha) +"deg)";
          css_obj.top = (offset - mask_height)+"px";
          css_obj.right = 0;
          $this.css(css_obj);
        }
        if ($this.hasClass("lb")) {
          css_obj = {};
          css_obj[transformOriginName] = "0 "+(mask_height - offset)+"px";
          css_obj[transformName] = "rotate("+ toDeg(alpha - Math.PI/2) +"deg)";
          css_obj.bottom = -offset+"px";
          $this.css(css_obj);
        }
        if ($this.hasClass("rb")) {
          css_obj = {};
          css_obj[transformOriginName] = "0 "+offset+"px";
          css_obj[transformName] = "rotate("+ toDeg(Math.PI/2*3 - alpha) +"deg)";
          css_obj.bottom = (offset - mask_height)+"px";
          css_obj.right = 0;
          $this.css(css_obj);
        }
      });

      var effect_render = function(w, $elem) {
        $elem.width(w);
        if ($elem.hasClass("rt") || $elem.hasClass("rb")) {
          $elem.css({
            right: -w + "px",
          })
        }
      }
      container.on("mouseenter", function() {
        var masks = $(this).find(".mask-high");
        var start_time = null;
        var call_back = function(t) {
          if (start_time == null) {
            start_time = t;
          }
          var progress = (t - start_time)/DURATION;
          masks.each(function(){
            var $this = $(this);
            var w = progress * mask_width;
            if (w >= mask_width) {
              effect_render(mask_width, $this);
              return
            }
            effect_render(w, $this);
          })
          if (progress > 1.0) {
            cancelAnimationFrame(aid);
            return;
          }
          requestAnimationFrame(call_back);
        }
        var aid = requestAnimationFrame(call_back);
      })
      $(".container").on("mouseleave", function() {
        var masks = $(this).find(".mask");
        var start_time = null;
        var mask_width = masks.eq(0).width();
        var call_back = function(t) {
          if (start_time == null) {
            start_time = t;
          }
          var progress = (t - start_time)/DURATION;

          masks.each(function(){
            var $this = $(this);
            var w = (1-progress) * mask_width;
            if (w <= 0) {
              $this.width(0);
              return;
            }
            effect_render(w, $this);
          })
          if (progress > 1.0) {
            cancelAnimationFrame(aid);
            return;
          }
          requestAnimationFrame(call_back);
        }
        var aid = requestAnimationFrame(call_back);
      })
    }
  }
});
