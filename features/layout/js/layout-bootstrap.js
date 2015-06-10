(function() {
  'use strict';

  window.Ractive.bootstrap = function(callback) {
    $(function() {
      var $cleaner = $('<div />').append($('body').html());
      $cleaner.find('script[type="text/javascript"]').remove();

      var page = new window.Ractive({
        el: 'body',
        template: $cleaner.html()
      });

      if (callback) {
        callback(page);
      }
    });
  };

})();
