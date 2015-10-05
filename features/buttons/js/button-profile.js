(function() {
  'use strict';

  window.Ractive.controller('button-profile', function(component, data, el, config, done) {

    var buttonProfile = component({
      plName: 'pl-button-profile',
      data: data
    });

    if (data.toggle) {
      buttonProfile.on('toggle', data.toggle);
    }

    done();
  });

})();
