(function() {
  'use strict';

  window.Ractive.controller('pl-grouped-buttons', function(component, data, el, config, done) {

    var GroupedButtons = component({
      plName: 'pl-grouped-buttons',
      data: $.extend(true, {
        orientaton: 'left',
        buttons: [],
        positions: [],
        action: function(event) {
          if (!event || !event.node) {
            return;
          }

          var index = parseInt($(event.node).parent().attr('data-index'), 10),
              button = GroupedButtons.get('buttons[' + index + ']'),
              component = GroupedButtons.findChild('data-index', index);

          GroupedButtons.fire('beforeAction', {
            event: event,
            button: button,
            component: component
          });

          if (button && button.action) {
            button.action(event, component);
          }

          GroupedButtons.fire('action', {
            event: event,
            button: button,
            component: component
          });
        }
      }, data)
    });

    function _registerIndicatorEvents(buttonEl, button, i) {
      buttonEl.on('showNotification', function(args) {
        GroupedButtons.set('buttons[' + i + '].width', args.width + 10);
      });

      buttonEl.on('hideNotification', function() {
        GroupedButtons.set('buttons[' + i + '].width', 55);
      });
    }

    GroupedButtons.observe('buttons', function() {
      GroupedButtons.require().then(function() {
        var buttons = GroupedButtons.get('buttons'),
            positions = GroupedButtons.get('positions'),
            totalWidth = 0;

        for (var i = buttons.length - 1; i >= 0; i--) {
          var button = buttons[i],
              buttonEl = GroupedButtons.findChild('data-index', i);

          positions[i] = totalWidth;

          if (!buttonEl) {
            return;
          }

          if (!button.isReady) {
            button.isReady = true;
            button.width = button.type == 'indicator' ? 55 : 50;

            if (button.type == 'indicator') {
              _registerIndicatorEvents(buttonEl, button, i);
            }

            if (button.ready) {
              button.ready(buttonEl);
            }
          }

          totalWidth += button.width || 0;
        }

        GroupedButtons.set('positions', positions);
      });
    });

    done();
  });

})();
