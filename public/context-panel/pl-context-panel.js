(function() {
  'use strict';

  window.Ractive.controller('pl-context-panel', function(component, data, el, config, done) {

    function _sections() {
      var $selector = _$el.panel.find('.pl-group');

      return $selector.length ? _$el.panel.find('.pl-context-panel-title, .pl-group.opened .pl-section') : _$el.panel.find('.pl-section');
    }

    var _inOpen = false,
        ContextPanel = component({
          plName: 'pl-context-panel',
          data: $.extend(true, {
            opened: false,
            usable: false
          }, data),

          open: function(callback, userBehavior, groupToOpen) {
            userBehavior = typeof userBehavior == 'undefined' || userBehavior ? true : false;

            _inOpen = groupToOpen || true;

            ContextPanel.fire('beforeOpen', {
              userBehavior: userBehavior
            });

            ContextPanel.set('opened', true);

            setTimeout(function() {
              if (!ContextPanel || !_inOpen) {
                return;
              }

              var $sections = _sections();

              $sections.each(function(i) {
                var $section = $(this);

                setTimeout(function() {
                  if (!ContextPanel || !_inOpen) {
                    return;
                  }

                  $section.addClass('opened');
                }, i * 80);
              });

              setTimeout(function() {
                if (!ContextPanel || !_inOpen) {
                  return;
                }

                ContextPanel.set('usable', true);

                ContextPanel.fire('open', {
                  userBehavior: userBehavior
                });

                if (callback) {
                  callback();
                }
              }, (($sections.length - 1) * 80) + 450);
            }, 250);
          },

          closeContent: function(callback, userBehavior) {
            userBehavior = typeof userBehavior == 'undefined' || userBehavior ? true : false;

            _inOpen = false;

            ContextPanel.fire('beforeCloseContent', {
              userBehavior: userBehavior
            });

            ContextPanel.set('usable', false);

            var $sections = _sections();

            $sections.each(function(i) {
              var $section = $(this);

              setTimeout(function() {
                if (!ContextPanel || _inOpen) {
                  return;
                }

                $section.removeClass('opened');
              }, ($sections.length - 1 - i) * 80);
            });

            setTimeout(function() {
              if (!ContextPanel || _inOpen) {
                return;
              }

              ContextPanel.fire('closeContent', {
                userBehavior: userBehavior
              });

              if (callback) {
                callback();
              }
            }, (($sections.length - 1) * 80) + 450);
          },

          close: function(callback, userBehavior, withoutCloseContent) {
            userBehavior = typeof userBehavior == 'undefined' || userBehavior ? true : false;
            withoutCloseContent = withoutCloseContent || false;

            if (!withoutCloseContent) {
              this.closeContent(function() {
                ContextPanel.close(callback, userBehavior, true);
              }, userBehavior);

              return;
            }

            ContextPanel.fire('beforeClose', {
              userBehavior: userBehavior
            });

            ContextPanel.set('opened', false);

            setTimeout(function() {
              if (!ContextPanel || _inOpen) {
                return;
              }

              ContextPanel.fire('close', {
                userBehavior: userBehavior
              });

              if (callback) {
                callback();
              }
            }, 250);
          },

          groupOpened: function(groupName) {
            var $group = null;

            _$el.panel.find('.pl-group.opened').each(function() {
              if ($(this).attr('data-group') == groupName) {
                $group = $(this);

                return false;
              }
            });

            return $group;
          },

          isGroupOpened: function(groupName) {
            return this.groupOpened(groupName) || _inOpen === groupName;
          },

          closeIfGroupOpened: function(groupName) {
            var $group = this.groupOpened(groupName);

            if ($group) {
              ContextPanel.close(function() {
                ContextPanel.fire('closeIfGroupOpened', {
                  $group: $group,
                  userBehavior: false
                });
              }, false);
            }
          },

          isOpened: function() {
            return ContextPanel.get('opened');
          }
        }),
        _$el = {
          panel: $(ContextPanel.el)
        };

    window.Ractive.Plumes.bindUses(
      ContextPanel,
      ['title', 'leftcross', 'rightcross'],
      ['leftcross', 'rightcross']
    );

    ContextPanel.on('cross', function(event) {
      var oncross = ContextPanel.get('on-cross');

      if (oncross) {
        oncross(event);
      }
    });

    ContextPanel.require().then(done);
  });
})();
