(function() {
  'use strict';

  window.Ractive.controller('pl-grouped-buttons', function(component, data, el, config, done) {

    var groupedButtons = component({
      plName: 'pl-grouped-buttons',
      data: $.extend(true, {
        orientaton: 'left',
        buttons: [],
        positions: [],
        action: function(event) {
          if (!event || !event.node) {
            return;
          }

          var index = $(event.node).parent().data('index'),
              button = groupedButtons.get('buttons[' + index + ']');

          if (button && button.action) {
            button.action(event, groupedButtons.findChild('data-index', index));
          }
        }
      }, data)
    });

    function _registerIndicatorEvents(buttonEl, button, i) {
      buttonEl.on('showNotification', function(args) {
        groupedButtons.set('buttons[' + i + '].width', args.width + 10);
      });

      buttonEl.on('hideNotification', function() {
        groupedButtons.set('buttons[' + i + '].width', 55);
      });
    }

    groupedButtons.observe('buttons', function() {
      groupedButtons.require().then(function() {
        var buttons = groupedButtons.get('buttons'),
            positions = groupedButtons.get('positions'),
            totalWidth = 0;

        for (var i = buttons.length - 1; i >= 0; i--) {
          var button = buttons[i],
              buttonEl = groupedButtons.findChild('data-index', i);

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

        console.log(positions);

        groupedButtons.set('positions', positions);
      });
    });

    done();
  });

})();
