(function() {
  'use strict';

  window.Ractive.controller('pl-grouped-buttons', function(component, data, el, config, done) {

    var MODES = {
      DEFAULT: 'default',
      COMPACT: 'compact'
    };

    var GroupedButtons = component({
      plName: 'pl-grouped-buttons',
      data: $.extend(true, {
        mode: MODES.DEFAULT,
        hidden: true,
        orientation: 'left',
        buttons: [],
        positions: [],
        compactPositionsTop: [],
        compactPositions: [],
        compactButtonPosition: -100,
        compactOpened: false,
        compactHeight: 0,

        action: function(event, component) {
          if (!component) {
            return;
          }

          var index = parseInt($(component.el).attr('data-index'), 10),
              button = GroupedButtons.get('buttons[' + index + ']'),
              component = GroupedButtons.findChild('data-index', index);

          GroupedButtons.fire('beforeAction', {
            event: event,
            button: button,
            component: component
          });

          if (GroupedButtons.get('mode') == MODES.COMPACT && GroupedButtons.get('compactOpened')) {
            GroupedButtons.fire('compactAction');
          }

          if (button && button.action) {
            button.action(event, component);
          }

          GroupedButtons.fire('action', {
            event: event,
            button: button,
            component: component
          });
        }
      }, data),

      hide: function() {
        if (GroupedButtons.get('hidden')) {
          return;
        }

        GroupedButtons.set('hidden', true);

        GroupedButtons.set('compactButtonPosition', -100);

        _updatePositions();
      },

      show: function() {
        if (!GroupedButtons.get('hidden')) {
          return;
        }

        GroupedButtons.set('hidden', false);

        if (GroupedButtons.get('mode') == MODES.COMPACT) {
          GroupedButtons.set('compactButtonPosition', -15);
        }

        _updatePositions();
      },

      compactMode: function() {
        if (GroupedButtons.get('mode') == MODES.COMPACT) {
          return;
        }

        GroupedButtons.set('mode', MODES.COMPACT);

        GroupedButtons.set('compactButtonPosition', -15);
      },

      defaultMode: function() {
        if (GroupedButtons.get('mode') == MODES.DEFAULT) {
          return;
        }

        if (GroupedButtons.get('compactOpened')) {
          GroupedButtons.fire('compactAction');
        }

        GroupedButtons.set('mode', MODES.DEFAULT);

        GroupedButtons.set('compactButtonPosition', -100);
      }
    });

    GroupedButtons.on('compactAction', function() {
      var compactOpened = !GroupedButtons.get('compactOpened');

      GroupedButtons.fire('beforeCompact', {
        button: GroupedButtons,
        opened: compactOpened
      });

      GroupedButtons.set('compactOpened', compactOpened);

      _updatePositions(function(args) {
        if (compactOpened) {
          GroupedButtons.set('compactHeight', args.compactHeight);
        }

        GroupedButtons.fire('compact', {
          button: GroupedButtons,
          opened: compactOpened
        });
      });
    });

    function _registerIndicatorEvents(component) {
      component.on('showNotification', function(args) {
        var index = parseInt($(component.el).attr('data-index'), 10);

        GroupedButtons.once('positionsChanged', function() {
          GroupedButtons.set('compactPositionsTop[' + index + ']', 0);
          GroupedButtons.set('compactPositions[' + index + ']', 0);

          if (GroupedButtons.get('mode') == MODES.COMPACT) {
            GroupedButtons.set('compactButtonPosition', -100);
          }
        });

        GroupedButtons.set('buttons[' + index + '].width', args.width + 5);
      });

      component.on('hideNotification', function() {
        var index = parseInt($(component.el).attr('data-index'), 10);

        GroupedButtons.set('buttons[' + index + '].width', 50);

        if (GroupedButtons.get('mode') == MODES.COMPACT) {
          GroupedButtons.set('compactButtonPosition', -15);
        }
      });
    }

    function _updatePositions(callback) {
      GroupedButtons.require().then(function() {
        var orientation = GroupedButtons.get('orientation'),
            buttons = GroupedButtons.get('buttons'),
            positions = GroupedButtons.get('positions'),
            compactPositionsTop = GroupedButtons.get('compactPositionsTop'),
            compactPositions = GroupedButtons.get('compactPositions'),
            compactOpened = GroupedButtons.get('compactOpened'),
            hidden = GroupedButtons.get('hidden'),
            windowWidth = $(window).width(),
            totalWidth = 0,
            compactTotalWidth = 20,
            compactTop = 0,
            compactHeight = 60;

        for (var i = buttons.length - 1; i >= 0; i--) {
          var button = buttons[i],
              component = GroupedButtons.findChild('data-index', i);

          if (hidden) {
            positions[i] = -100;
            compactPositions[i] = -100;
          }
          else {
            positions[i] = totalWidth - (orientation == 'right' && button.type == 'indicator' ? 5 : 0);

            if (compactOpened) {
              compactPositions[i] = compactTotalWidth;
            }
            else {
              compactPositions[i] = -100;
            }
          }

          compactPositionsTop[i] = compactTop;

          if (!component) {
            return;
          }

          if (!button.isReady) {
            button.isReady = true;
            button.width = 50;

            if (button.type == 'indicator') {
              _registerIndicatorEvents(component, button, i);
            }

            if (button.ready) {
              button.ready(component);
            }
          }

          totalWidth += button.width || 0;
          compactTotalWidth += button.width || 0;

          if (!hidden && compactTotalWidth > windowWidth) {
            compactHeight += 50;
            compactTop += 50;
            compactTotalWidth = 20;
            compactPositionsTop[i] = compactTop;

            if (compactOpened) {
              compactPositions[i] = compactTotalWidth;
            }
          }
        }

        GroupedButtons.set('positions', positions);
        GroupedButtons.set('compactPositionsTop', compactPositionsTop);
        GroupedButtons.set('compactPositions', compactPositions);

        setTimeout(function() {
          GroupedButtons.fire('positionsChanged');
        });

        if (callback) {
          callback({
            compactHeight: compactHeight
          });
        }
      });
    }

    GroupedButtons.observe('buttons', function() {
      _updatePositions();
    });

    _updatePositions();

    done();
  });

})();
