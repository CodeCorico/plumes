(function() {
  'use strict';

  window.Ractive.controller('pl-button-indicator', function(component, data, el, config, done) {

    var NOTIFICATION_DISPLAY_TIME = 6000,

        activeNotification = null,
        closeTimeout = null,
        buttonIndicator = component({
          plName: 'pl-button-indicator',
          data: $.extend(true, {
            notificationDisplayTime: NOTIFICATION_DISPLAY_TIME,
            notificationsCount: 0
          }, data),
          pushNotification: function(message, picture, args, forceUncount) {
            activeNotification = {
              message: message,
              picture: picture || null,
              args: args || null
            };

            if (closeTimeout) {
              clearTimeout(closeTimeout);
            }

            if (!forceUncount) {
              buttonIndicator.set('notificationsCount', buttonIndicator.get('notificationsCount') + 1);
            }

            buttonIndicator.set('notificationMessage', message);
            if (picture) {
              buttonIndicator.set('notificationPicture', picture);
            }

            setTimeout(function() {
              buttonIndicator.set('showMessage', true);

              setTimeout(function() {
                buttonIndicator.close();
              }, buttonIndicator.get('notificationDisplayTime'));
            });
          },
          close: function() {
            if (!buttonIndicator.get('showMessage')) {
              return;
            }

            activeNotification = null;
            buttonIndicator.set('showMessage', false);
            setTimeout(function() {
              buttonIndicator.set('notificationPicture', null);
            }, 700);
          },
          clearNotificationsCount: function() {
            buttonIndicator.set('notificationsCount', 0);
          }
        });

    if (data.action) {
      buttonIndicator.on('action', function(event) {
        data.action(event, activeNotification);
        event.original.stopPropagation();
      });
    }

    done();
  });

})();
