(function() {
  'use strict';

  window.Ractive.controller('pl-button-indicator', function(component, data, el, config, done) {

    var NOTIFICATION_DISPLAY_TIME = 6000,

        activeNotification = null,
        closeTimeout = null,
        ButtonIndicator = component({
          plName: 'pl-button-indicator',
          data: $.extend(true, {
            notificationDisplayTime: NOTIFICATION_DISPLAY_TIME,
            notificationsCount: 0
          }, data),

          action: function() {
            var action = ButtonIndicator.get('action');

            if (action) {
              action(null, ButtonIndicator, activeNotification);
            }
          },
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
              ButtonIndicator.set('notificationsCount', ButtonIndicator.get('notificationsCount') + 1);
            }

            ButtonIndicator.set('notificationMessage', message);
            if (picture) {
              ButtonIndicator.set('notificationPicture', picture);
            }

            setTimeout(function() {
              ButtonIndicator.set('showMessage', true);

              ButtonIndicator.fire('showNotification', {
                duration: 1000,
                width: 250
              });

              setTimeout(function() {
                ButtonIndicator.close();
              }, ButtonIndicator.get('notificationDisplayTime'));
            });
          },
          close: function() {
            if (!ButtonIndicator.get('showMessage')) {
              return;
            }

            activeNotification = null;
            ButtonIndicator.set('showMessage', false);

            ButtonIndicator.fire('hideNotification', {
              duration: 1000,
              width: 50
            });

            setTimeout(function() {
              ButtonIndicator.set('notificationPicture', null);
            }, 700);
          },
          clearNotificationsCount: function() {
            ButtonIndicator.set('notificationsCount', 0);
          }
        });

    if (data.action) {
      ButtonIndicator.on('action', function(event) {
        data.action(event, ButtonIndicator, activeNotification);
        event.original.stopPropagation();
      });
    }

    done();
  });

})();
