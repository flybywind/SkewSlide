function toDeg(rad) {
  return rad/Math.PI * 180;
}
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
    masks.each(function() {
      var $this = $(this);
      $this.height(mask_height).width(0);
      if ($this.hasClass("lt")) {
        $this.css({
          top: -offset+"px",
          transformOrigin: "0 "+offset+"px",
          transform: "rotate("+ toDeg(Math.PI/2 - alpha) +"deg)",
        })
      }
      if ($this.hasClass("rt")) {
        $this.css({
          top: (offset - mask_height)+"px",
          right: -mask_width + "px",
          transformOrigin: "0 "+(mask_height - offset)+"px",
          transform: "rotate("+ toDeg(Math.PI/2 + alpha) +"deg)",
        })
      }
      if ($this.hasClass("lb")) {
        $this.css({
          bottom: -offset+"px",
          transformOrigin: "0 "+(mask_height - offset)+"px",
          transform: "rotate("+ toDeg(alpha - Math.PI/2) +"deg)",
        })
      }
      if ($this.hasClass("rb")) {
        $this.css({
          bottom: (offset - mask_height)+"px",
          right: -mask_width + "px",
          transformOrigin: "0 "+offset+"px",
          transform: "rotate("+ toDeg(Math.PI/2*3 - alpha) +"deg)",
        })
      }
    });

    $(".container").on("mouseenter", function() {
      var $this = $(this);
      var masks = $this.find(".mask");
      masks.each(function() {
        $(this).width(mask_width);
      })
    })
    $(".container").on("mouseleave", function() {
      var $this = $(this);
      var masks = $this.find(".mask");
      masks.each(function() {
        $(this).width(0);
      })
    })
  }
});
