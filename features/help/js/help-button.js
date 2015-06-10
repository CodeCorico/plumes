(function() {
  'use strict';

  window.Ractive.controller('help-button', function(component, data, el, config, done) {

    var helpButton = component({
      data: data
    });

    if (data.toggle) {
      helpButton.on('toggle', data.toggle);
    }

    done();
  });

})();
