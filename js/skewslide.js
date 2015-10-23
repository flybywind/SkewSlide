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
      $this.height(mask_height)
           .width(mask_width);

      if ($this.hasClass("lt")) {
        $this.css({
          top: -offset+"px",
          left: 0,
        })
      }
      if ($this.hasClass("rt")) {
        $this.css({
          top: (offset - mask_height)+"px",
          right: -mask_width + "px",
        })
      }
      if ($this.hasClass("lb")) {
        $this.css({
          bottom: -offset+"px",
          left:0,
        })
      }
      if ($this.hasClass("rb")) {
        $this.css({
          bottom: (offset - mask_height)+"px",
          right: -mask_width + "px",
        })
      }
    })
  }
});
