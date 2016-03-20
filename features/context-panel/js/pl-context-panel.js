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
          open: function(callback) {
            _inOpen = true;

            ContextPanel.fire('beforeOpen');

            ContextPanel.set('opened', true);

            setTimeout(function() {
              if (!_inOpen) {
                return;
              }

              var $sections = _sections();

              $sections.each(function(i) {
                var $section = $(this);

                setTimeout(function() {
                  if (!_inOpen) {
                    return;
                  }

                  $section.addClass('opened');
                }, i * 80);
              });

              setTimeout(function() {
                if (!_inOpen) {
                  return;
                }

                ContextPanel.set('usable', true);

                ContextPanel.fire('open');

                if (callback) {
                  callback();
                }
              }, (($sections.length - 1) * 80) + 450);
            }, 250);
          },
          closeContent: function(callback) {
            _inOpen = false;

            ContextPanel.fire('beforeCloseContent');

            ContextPanel.set('usable', false);

            var $sections = _sections();

            $sections.each(function(i) {
              var $section = $(this);

              setTimeout(function() {
                if (_inOpen) {
                  return;
                }

                $section.removeClass('opened');
              }, ($sections.length - 1 - i) * 80);
            });

            setTimeout(function() {
              if (_inOpen) {
                return;
              }

              ContextPanel.fire('closeContent');

              if (callback) {
                callback();
              }
            }, (($sections.length - 1) * 80) + 450);
          },
          close: function(callback) {
            ContextPanel.fire('beforeClose');

            this.closeContent(function() {
              ContextPanel.set('opened', false);

              setTimeout(function() {
                ContextPanel.fire('close');

                if (callback) {
                  callback();
                }
              }, 250);
            });
          },
          isOpened: function() {
            return ContextPanel.get('opened');
          }
        }),
        _$el = {
          panel: $(ContextPanel.el)
        };

    window.Ractive.bindUses(
      ContextPanel,
      ['title', 'scrollbar', 'leftcross', 'rightcross'],
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
