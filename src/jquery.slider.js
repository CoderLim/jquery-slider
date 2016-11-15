/*
 *  name: jQuery Image Slider
 *  author: gengliming
 *  version: bete 1.0.0
 *
 */
(function(factory) {

    factory(jQuery);

})(function($) {
    $.fn.imageSlider = function(options) {
      if (!options.images || !$.isArray(options.images)) {
        throw new Error('options.images invalid');
      }

      var defaults = {
        /* previous and next button */
        prevIcon: 'http://gengliming.com/assets/images/favicon.png',
        nextIcon: 'http://gengliming.com/assets/images/favicon.png',
        prevText: '',
        nextText: '',

        /*image box-model*/
        margin: 10,
        border: 10,
      };

      options = $.extend(defaults, options);

      return this.each(function() {
          // make $this empty at first
          $(this).empty();

          var $this = $(this),
              $container = null,
              $prev = null,
              $next = null,
              $slider = null,
              $sliderWrapper = null,
              $items = [],

              /* it's not image */
              itemWidth = 0,
              margin = options.margin,
              totalWidth = 0,
              border = options.border;

          // 初始化
          init();

          function init() {
            /*
             *   <div style="position:relative">
             *     <span class="glm-prev"></span>
             *     <div class="glm-slider-wrapper">
             *       <div class="glm-slider">
             *         <div class="glm-item""><img src=""></div>
             *         <div class="glm-item""><img src=""></div>
             *         <div class="glm-item""><img src=""></div>
             *         <div class="glm-item""><img src=""></div>
             *       </div>
             *     </div><span class="glm-next"></span>
             *    </div>
             */
            $container = $('<div style="position:relative"/>');
            $prev = $('<div class="glm-prev">' + options.prevText + '</div>');
            $next = $('<div class="glm-next">' + options.nextText + '</div>');
            $slider = $(' <div class="glm-slider"></div>');
            $sliderWrapper = $('<div class="glm-slider-wrapper"></div>');

            $this.append($container);
            $container.append($prev);
            $container.append($sliderWrapper);
            $container.append($next)
            $sliderWrapper.append($slider);

            $(options.images).each(function(index, image) {
              var $item = $('<div class="glm-item"></div>');
              var $img = $('<img src="'+ image +'">');
              $item.append($img);
              $img.on('load', function () {
                itemWidth = $(this).parent().width();
                totalWidth = options.images.length*(itemWidth+margin)-margin;
              });
              if (index > 0) {
                /*$img.css('margin-left', margin + 'px');*/
              }
              $slider.append($item);
              $items.push($item);
            });

            options.prevIcon && $prev.css({
              'background-image': 'url('+ options.prevIcon +')',
            });

            options.nextIcon && $next.css({
              'background-image': 'url('+ options.nextIcon +')',
            });

            $prev.on('click', function() {
              console.log($slider.position().left);
              console.log(totalWidth - $sliderWrapper.width());
              if ($slider.is(':animated')) return;
              if (totalWidth - $sliderWrapper.width() >= -$slider.position().left) {
                prev();
              }
            });

            $next.on('click', function() {
              if ($slider.is(':animated')) return;
              if ($slider.position().left < 0) {
                next();
              }
            });
          }

          function prev() {
            //$slider.css('left', $slider.position().left - (itemWidth + margin) +'px');
            $slider.animate({
              'left': $slider.position().left - (itemWidth) +'px'
            });
          }

          function next() {
            //$slider.css('left', $slider.position().left + (itemWidth + margin) +'px');
            $slider.animate({
              'left': $slider.position().left + (itemWidth) +'px'
            });
          }
    });
  }
});

