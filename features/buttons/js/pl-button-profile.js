(function() {
  'use strict';

  window.Ractive.controller('pl-button-profile', function(component, data, el, config, done) {

    var NOTIFICATION_DISPLAY_TIME = 6000,

        activeNotification = null,
        closeTimeout = null,
        buttonProfile = component({
          plName: 'pl-button-profile',
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
              buttonProfile.set('notificationsCount', buttonProfile.get('notificationsCount') + 1);
            }

            buttonProfile.set('notificationMessage', message);
            if (picture) {
              buttonProfile.set('notificationPicture', picture);
            }

            setTimeout(function() {
              buttonProfile.set('showMessage', true);

              setTimeout(function() {
                buttonProfile.close();
              }, buttonProfile.get('notificationDisplayTime'));
            });
          },
          close: function() {
            if (!buttonProfile.get('showMessage')) {
              return;
            }

            activeNotification = null;
            buttonProfile.set('showMessage', false);
            setTimeout(function() {
              buttonProfile.set('notificationPicture', null);
            }, 350);
          },
          clearNotificationsCount: function() {
            buttonProfile.set('notificationsCount', 0);
          }
        });

    if (data.toggle) {
      buttonProfile.on('toggle', function(event) {
        data.toggle(event, activeNotification);
        event.original.stopPropagation();
      });
    }

    done();
  });

})();
