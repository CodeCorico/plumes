(function() {
  'use strict';

  window.Ractive.controller('pl-notifications-panel', function(component, data, el, config, done) {

    var _scrolls = null;

    var NotificationsPanel = component({
      plName: 'pl-notifications-panel',
      data: $.extend(true, {
        notifications: [],
        dark: false,
        texts: {
          empty: 'No new notification.',
          emails: 'emails'
        },

        emailstoggle: function(event, isOn) {
          event.original.stopPropagation();

          var emailsToggleFunc = NotificationsPanel.get('emails-toggle');
          if (emailsToggleFunc) {
            emailsToggleFunc(event, isOn);
          }

          if (_scrolls) {
            _scrolls.update();
          }
        }
      }, data),

      pushNotification: function(content, time, picture, args, viewed) {
        this.unshift('notifications', {
          picture: picture,
          time: time,
          content: content,
          args: args || null,
          viewed: viewed || false
        });
      }
    });

    window.Ractive.Plumes.bindUses(NotificationsPanel, ['section', 'emails']);

    window.Ractive.Plumes.bindTexts(NotificationsPanel);

    if (data.openitem) {
      NotificationsPanel.on('openitem', function(event) {
        data.openitem(event);
        event.original.stopPropagation();
      });
    }

    NotificationsPanel.observe('notifications', function() {
      if (_scrolls) {
        _scrolls.update();
      }
    });

    NotificationsPanel.require().then(function() {
      _scrolls = NotificationsPanel.findChild('name', 'pl-scrolls');

      done();
    });
  });

})();
