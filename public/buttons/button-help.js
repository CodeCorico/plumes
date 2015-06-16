(function() {
  'use strict';

  window.Ractive.controller('button-help', function(component, data, el, config, done) {

    var buttonHelp = component({
      data: data
    });

    if (data.toggle) {
      buttonHelp.on('toggle', data.toggle);
    }

    done();
  });

})();
