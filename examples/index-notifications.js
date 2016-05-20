(function() {
  'use strict';

  window.Ractive.controller('index-notifications', function(component, data, el, config, done) {

    var content = component({
          data: data
        }),
        _notificationsPanel = null;

    content.set('openItem', function(event) {
      event.context.viewed = true;
      _notificationsPanel.update(event.keypath);
    });

    content.require().then(function() {
      _notificationsPanel = content.findChild('name', 'pl-notifications-panel');

      done();
    });
  });

})();
