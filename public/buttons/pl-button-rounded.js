(function() {
  'use strict';

  window.Ractive.controller('pl-button-rounded', function(component, data, el, config, done) {

    var ButtonRounded = component({
      plName: 'pl-button-rounded',
      data: data
    });

    if (data.action) {
      ButtonRounded.on('action', function(event) {
        data.action(event);
        event.original.stopPropagation();
      });
    }

    done();
  });

})();
