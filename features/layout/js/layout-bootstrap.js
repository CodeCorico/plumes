(function() {
  'use strict';

  window.Ractive.bootstrap = function(callback) {
    $(function() {
      var partials = {},
          $cleaner = $('<div />').append($('body').html());

      $cleaner.find('script[type="text/javascript"]').remove();

      var $rvPartials = $cleaner.find('rv-partial');

      $rvPartials.each(function(i, rvPartial) {
        var src = rvPartial.getAttribute('src') || false,
            target = rvPartial.getAttribute('target');

        if (!src && target) {
          partials[target] = $.trim(rvPartial.innerHTML);
        }
      });

      $rvPartials.remove();

      var page = new window.Ractive({
        el: 'body',
        template: $.trim($cleaner.html()),
        partials: partials
      });

      if (callback) {
        callback(page);
      }
    });
  };

})();
