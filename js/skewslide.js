function toDeg(rad) {
  return rad/Math.PI * 180;
}
var DURATION = 1000; //ms

$(function() {
  var img = $(".container img");
  var img_height = img.height();
  var img_width = img.width();
  var alpha = undefined;
  if (img_height > 0 && img_width > 0) {
    alpha = Math.atan(img_height/img_width);
  }

  if (alpha !== undefined) {
    var masks = $(".container .mask");
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

    $(".container").on("mouseenter", function() {
      var masks = $(this).find(".mask");
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
            $this.width(mask_width);
            if ($this.hasClass("rt")) {
              $this.css({
                right: -mask_width + "px",
              })
            }
            if ($this.hasClass("rb")) {
              $this.css({
                right: -mask_width + "px",
              })
            }
            return
          }
          $this.width(w);
          if ($this.hasClass("rt")) {
            $this.css({
              right: -w + "px",
            })
          }
          if ($this.hasClass("rb")) {
            $this.css({
              right: -w + "px",
            })
          }
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
          $this.width(w);
          if ($this.hasClass("rt")) {
            $this.css({
              right: -w + "px",
            })
          }
          if ($this.hasClass("rb")) {
            $this.css({
              right: -w + "px",
            })
          }
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
});
