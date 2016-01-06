(function() {
  'use strict';

  window.Ractive.controller('pl-layout-notifications', function(component, data, el, config, done) {

    data.title = typeof data['text-title'] == 'undefined' ? 'notifications' : data['text-title'];
    data.nonotification = typeof data['text-nonotification'] == 'undefined' ? 'No new notification.' : data['text-nonotification'];
    data.signoutlabel = typeof data['text-signoutlabel'] == 'undefined' ? 'signout' : data['text-signoutlabel'];
    data.emailslabel = typeof data['text-emailslabel'] == 'undefined' ? 'emails' : data['text-emailslabel'];

    var _$el = {
          body: $('body')
        },
        layoutNotifications = component({
          plName: 'pl-button-profile',
          data: $.extend(true, {
            opened: false,
            notifications: [],
            emailstoggle: function(event, isOn) {
              event.original.stopPropagation();

              var emailsToggleFunc = layoutNotifications.get('emails-toggle');
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
          },
          toggle: function() {
            this.set('opened', !this.get('opened'));
            this.fire('toggle');
          },
          open: function() {
            this.set('opened', true);
            this.fire('toggle');
          },
          close: function() {
            this.set('opened', false);
            this.fire('toggle');
          },
          isToggled: function() {
            return this.get('opened');
          }
        });

    if (data.toggle) {
      layoutNotifications.on('toggle', function(event) {
        data.toggle(event, layoutNotifications.get('opened'));
      });
    }

    if (data.signout) {
      layoutNotifications.on('signout', function(event) {
        data.signout(event);
        event.original.stopPropagation();
      });
    }

    if (data.openitem) {
      layoutNotifications.on('openitem', function(event) {
        data.openitem(event);
        event.original.stopPropagation();
      });
    }

    function _close() {
      layoutNotifications.close();
    }

    layoutNotifications.on('teardown', function() {
      _$el.body.unbind('click', _close);
    });

    _$el.body.click(_close);

    layoutNotifications.require().then(done);
  });

})();
