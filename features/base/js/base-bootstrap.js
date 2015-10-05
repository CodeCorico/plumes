(function() {
  'use strict';

  window.Ractive.bootstrap = function(callback) {
    function _inScope(element, rvRequireCount) {
      rvRequireCount = rvRequireCount || 0;

      if (!element.parentNode) {
        return true;
      }

      var tag = element.parentNode.tagName.toLowerCase();

      if (tag == 'rv-require') {
        rvRequireCount++;

        if (rvRequireCount > 1) {
          return false;
        }
      }
      else if (tag == 'rv-partial') {
        return false;
      }

      return _inScope(element.parentNode, rvRequireCount);
    }

    $(function() {
      var partials = {},
          $cleaner = $('<div />').append($('body').html());

      $cleaner.find('script[type="text/javascript"]').remove();

      var $rvPartials = $cleaner.find('rv-partial');

      $rvPartials.each(function(i, rvPartial) {
        var src = rvPartial.getAttribute('src') || false,
            target = rvPartial.getAttribute('target');

        if (!src && target && _inScope(rvPartial)) {
          partials[target] = $.trim(rvPartial.innerHTML);
        }
      });

      $rvPartials.remove();

      var page = new window.Ractive({
        plName: 'pl-page',
        el: 'body',
        data: {
          cls: []
        },
        template: $.trim($cleaner.html()),
        partials: partials
      });

      page.observe('cls', function(cls) {
        $(page.el).attr('class', cls ? cls.join(' ') : '');
      });

      if (callback) {
        callback(page);
      }
    });
  };

})();
