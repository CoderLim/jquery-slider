(function(factory) {

    factory(jQuery);

})(function($) {

    $.fn.imageSlider = function(options) {
      if (!options.images || !$.isArray(options.images)) {
        throw new Error('options.images invalid');
      }

      var defaults = {
        /* previous and next button */
        prevIcon: '',
        nextIcon: '',

        /*image box-model*/
        itemWidth: 100,
        itemHeight: 100,
        itemMargin: 5,
      };

      options = $.extend(defaults, options);

      console.log(options);

      return this.each(function() {
          var $this = $(this),
              $container = null,
              $prev = null,
              $next = null,
              $slider = null,
              $sliderWrapper = null,
              $items = [],

              itemWidth = options.itemWidth,
              itemHeight = options.itemHeight,
              itemMargin = options.itemMargin,
              totalWidth = options.images.length * (options.itemWidth + options.itemMargin) - options.itemMargin;

          // 初始化
          init();

          function init() {
            /*
             *    <div>
             *      <div class="glm-">
             *      </div>
             *    </div>
             */
            $container = $('<div style="position:relative"/>');
            $prev = $('<span class="glm-prev">p</span>');
            $next = $('<span class="glm-next">n</span>');
            $slider = $(' <div class="glm-slider"></div>');
            $sliderWrapper = $('<div class="glm-slider-wrapper"></div>');

            $this.append($container);
            $container.append($prev);
            $container.append($sliderWrapper);
            $container.append($next);
            $sliderWrapper.append($slider);

            $(options.images).each(function(index, image) {
              var $item = $('<div class="glm-item"></div>');
              $item.css({
                'width': itemWidth + 'px',
                'height': itemHeight + 'px',
                'background': 'url(' + image + ')'
              });
              $slider.append($item);
              $items.push($item);
            });

            $prev.css({
              'background': 'url('+ prevIcon +')',
              'height': itemHeight + 'px',
              'line-height': itemHeight + 'px'
            });

            $next.css({
              'background': 'url('+ nextIcon +')',
              'height': itemHeight + 'px',
              'line-height': itemHeight + 'px'
            });

            $prev.on('click', function() {
              if (totalWidth - $sliderWrapper.width() >= -$slider.position().left) {
                prev();
              }
            });

            $next.on('click', function() {
              if ($slider.position().left < 0) {
                next();
              }
            });
          }

          function prev() {
            $slider.css('left', $slider.position().left - (itemWidth + itemMargin) +'px');
          }

          function next() {
            $slider.css('left', $slider.position().left + (itemWidth + itemMargin) +'px');
          }
    });
  }

});

