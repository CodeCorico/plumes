(function() {
  'use strict';

  window.Ractive.controller('pl-button-help', function(component, data, el, config, done) {

    var buttonHelp = component({
      plName: 'pl-button-help',
      data: data
    });

    if (data.toggle) {
      buttonHelp.on('toggle', data.toggle);
    }

    done();
  });

})();
