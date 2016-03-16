(function() {
  'use strict';

  window.Ractive.controller('pl-button-rounded', function(component, data, el, config, done) {

    component({
      plName: 'pl-button-rounded',
      data: data,
      action: function() {
        if (data.action) {
          data.action(event);
        }
      }
    });

    done();
  });

})();
