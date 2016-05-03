(function() {
  'use strict';

  window.Ractive.controller('pl-button-rounded', function(component, data, el, config, done) {

    var ButtonRounded = component({
      plName: 'pl-button-rounded',
      data: data,
      action: function(userBehavior) {
        userBehavior = typeof userBehavior == 'undefined' || userBehavior ? true : false;

        var action = ButtonRounded.get('action');

        if (action) {
          action(null, ButtonRounded, userBehavior);
        }
      }
    });

    if (data.action) {
      ButtonRounded.on('action', function(event) {
        data.action(event, ButtonRounded, true);
        event.original.stopPropagation();
      });
    }

    done();
  });

})();
