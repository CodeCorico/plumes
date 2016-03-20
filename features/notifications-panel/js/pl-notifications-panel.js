(function() {
  'use strict';

  window.Ractive.controller('pl-notifications-panel', function(component, data, el, config, done) {

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
        }
      }, data),

      pushNotification: function(content, time, picture, args) {
        var notifications = this.get('notifications');
        notifications = notifications || [];

        notifications.unshift({
          picture: picture,
          time: time,
          content: content,
          args: args || null
        });
        this.set('notifications', notifications);
      }
    });

    window.Ractive.bindUses(NotificationsPanel, ['section', 'emails']);

    window.Ractive.bindTexts(NotificationsPanel);

    if (data.openitem) {
      NotificationsPanel.on('openitem', function(event) {
        data.openitem(event);
        event.original.stopPropagation();
      });
    }

    NotificationsPanel.require().then(done);
  });

})();
