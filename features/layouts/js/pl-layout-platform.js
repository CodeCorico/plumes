(function() {
  'use strict';

  window.Ractive.controller('pl-layout-platform', function(component, data, el, config, done) {
    var VIEWS = {
          DESKTOP: 1000,
          TABLET: 450,
          MOBILE: 0
        },

        Title = null,
        _groupedButtons = {
          left: null,
          right: null
        },
        _contexts = {
          left: null,
          right: null
        };

    function _resize(openOrientation) {
      var screenWidth = _$el.window.width();

      if (screenWidth >= VIEWS.DESKTOP) {
        LayoutPlatform.set('leftContextWidth', LayoutPlatform.get('leftContextOpened') ? '25%' : 0);
        LayoutPlatform.set('rightContextWidth', LayoutPlatform.get('rightContextOpened') ? '25%' : 0);

        LayoutPlatform.set('contentLeft', LayoutPlatform.get('leftContextOpened') ? '25%' : 0);
        LayoutPlatform.set('contentRight', LayoutPlatform.get('rightContextOpened') ? '25%' : 0);

        if (_groupedButtons.left) {
          _groupedButtons.left.defaultMode();
        }
        if (_groupedButtons.right) {
          _groupedButtons.right.defaultMode();
        }
        LayoutPlatform.set('screen', 'screen-desktop');
      }
      else {
        if (openOrientation == 'left' && LayoutPlatform.get('rightContextOpened')) {
          _contexts.right.close();
          LayoutPlatform.set('rightContextOpened', false);
        }
        else if (openOrientation == 'right' && LayoutPlatform.get('leftContextOpened')) {
          _contexts.left.close();
          LayoutPlatform.set('leftContextOpened', false);
        }
        else if (LayoutPlatform.get('leftContextOpened') && LayoutPlatform.get('rightContextOpened')) {
          _contexts.right.close();
          LayoutPlatform.set('rightContextOpened', false);
        }

        if (screenWidth >= VIEWS.TABLET) {
          LayoutPlatform.set('leftContextWidth', LayoutPlatform.get('leftContextOpened') ? '75%' : 0);
          LayoutPlatform.set('rightContextWidth', LayoutPlatform.get('rightContextOpened') ? '75%' : 0);

          LayoutPlatform.set('contentLeft',
            LayoutPlatform.get('leftContextOpened') ? '75%' : (
            LayoutPlatform.get('rightContextOpened') ? '-75%' : 0)
          );
          LayoutPlatform.set('contentRight',
            LayoutPlatform.get('rightContextOpened') ? '75%' : (
            LayoutPlatform.get('leftContextOpened') ? '-75%' : 0)
          );

          if (_groupedButtons.left) {
            _groupedButtons.left.defaultMode();
          }
          if (_groupedButtons.right) {
            _groupedButtons.right.defaultMode();
          }
          LayoutPlatform.set('screen', 'screen-tablet');
        }
        else if (screenWidth >= VIEWS.MOBILE) {
          LayoutPlatform.set('leftContextWidth', LayoutPlatform.get('leftContextOpened') ? '100%' : 0);
          LayoutPlatform.set('rightContextWidth', LayoutPlatform.get('rightContextOpened') ? '100%' : 0);

          LayoutPlatform.set('contentLeft', 0);
          LayoutPlatform.set('contentRight', 0);

          if (_groupedButtons.left) {
            _groupedButtons.left.compactMode();
          }
          if (_groupedButtons.right) {
            _groupedButtons.right.compactMode();
          }
          LayoutPlatform.set('screen', 'screen-mobile');
        }
      }

      var templateWidth = _$el.contentTemplate.outerWidth();

      if (templateWidth >= VIEWS.DESKTOP) {
        LayoutPlatform.set('contentMedia', 'media-desktop');

        LayoutPlatform.fire('view', 'DESKTOP');
      }
      else if (templateWidth >= VIEWS.TABLET) {
        LayoutPlatform.set('contentMedia', 'media-tablet');

        LayoutPlatform.fire('view', 'TABLET');
      }
      else if (templateWidth >= VIEWS.MOBILE) {
        LayoutPlatform.set('contentMedia', 'media-mobile');

        LayoutPlatform.fire('view', 'MOBILE');
      }
    }

    function _closeContext(orientation) {
      var panel = LayoutPlatform.findChild('data-pl-name', 'context-' + orientation);

      panel.close();
    }

    function _registerGroupedButtonsEvents(orientation, component) {
      _groupedButtons[orientation] = component;

      component.on('beforeAction', _beforeButtonsAction);
      component.on('beforeCompact', _beforeButtonsCompact);

      _resize();

      _groupedButtons[orientation].show();
    }

    function _registerContextEvents(orientation, component) {
      _contexts[orientation] = component;

      component.on('beforeOpen', function() {
        LayoutPlatform.set(orientation + 'ContextOpened', true);

        _resize(orientation);
      });

      component.on('close', function() {
        LayoutPlatform.set(orientation + 'ContextOpened', false);

        _resize();
      });

      component.on('closeIfGroupOpened', function(args) {
        if (!args || !args.$group) {
          return;
        }

        args.$group.removeClass('opened');
      });
    }

    function _displayContextGroup(orientation, context, $context, $group) {
      $context.find('.pl-group').removeClass('opened');

      $group.addClass('opened');

      var title = $group.attr('data-title');

      if ($group.attr('data-no-title') == 'true') {
        LayoutPlatform.set('context' + orientation + 'usetitle', false);
        LayoutPlatform.set('context' + orientation + 'title', null);
      }
      else if (typeof title != 'undefined') {
        LayoutPlatform.set('context' + orientation + 'usetitle', true);
        LayoutPlatform.set('context' + orientation + 'title', title);
      }

      context.open();
    }

    function _beforeButtonsAction(args) {
      if (!args || !args.button || (!args.button.context && !args.button.group)) {
        return;
      }

      if (args.button.group) {
        var beforeGroup = args.button.beforeGroup || function(context, $group, callback) {
          callback();
        };

        ['left', 'right'].forEach(function(orientation) {
          var context = _contexts[orientation],
              $context = $(context.el),
              $group = $context.find('[data-group="' + args.button.group + '"]');

          if (!$group.length) {
            return;
          }

          if ($group.hasClass('opened')) {
            return context.open();
          }

          beforeGroup(context, $group, function() {
            if (context.isOpened()) {
              context.closeContent(function() {
                _displayContextGroup(orientation, context, $context, $group);
              });
            }
            else {
              _displayContextGroup(orientation, context, $context, $group);
            }
          });
        });
      }
      else if (args.button.context) {
        var context = _contexts[args.button.context];
        if (!context) {
          return;
        }

        var beforeContext = args.button.beforeContext || function(callback) {
          callback();
        };

        beforeContext(context, function callback() {
          context.open();
        });
      }
    }

    function _beforeButtonsCompact(args) {
      if (!args || !args.button) {
        return;
      }

      if (args.button == _groupedButtons.left) {
        _groupedButtons.right[args.opened ? 'hide' : 'show']();
      }
      else if (args.button == _groupedButtons.right) {
        _groupedButtons.left[args.opened ? 'hide' : 'show']();
      }
    }

    var LayoutPlatform = component({
          plName: 'pl-layout-platform',
          data: $.extend(true, {
            loaded: false,
            titleLeftOffset: -80,
            titleBgLeftOffset: 0,
            titleBgWidth: 0,
            titleBgHeight: 0,
            buttonsleft: [],
            buttonsright: [],
            contextlefttitle: '',
            contextrighttitle: '',
            contextleftusetitle: true,
            contextrightusetitle: true,
            leftContextWidth: 0,
            rightContextWidth: 0,
            leftContextOpened: false,
            rightContextOpened: false,
            contentLeft: 0,
            contentRight: 0,
            contentMedia: '',

            crossleftcontext: function() {
              _closeContext('left');
            },
            crossrightcontext: function() {
              _closeContext('right');
            }
          }, data),

          leftGroupedButtons: function() {
            return _groupedButtons.left;
          },
          rightGroupedButtons: function() {
            return _groupedButtons.right;
          },

          leftContext: function() {
            return _contexts.left;
          },
          rightContext: function() {
            return _contexts.right;
          }
        }),
        Page = LayoutPlatform.parentRequire,
        _$el = {
          window: $(window),
          platform: $(LayoutPlatform.el),
          content: $(LayoutPlatform.el).find('.pl-layout-platform-content'),
          contentTemplate: $(LayoutPlatform.el).find('.pl-layout-platform-content-template')
        };

    window.Ractive.bindUses(LayoutPlatform, ['mask']);

    _$el.window.resize(_resize);

    LayoutPlatform.on('teardown', function() {
      _$el.window.off('resize', _resize);
    });

    _resize();

    function _updatePosition() {
      var width = _$el.titleText.outerWidth();

      LayoutPlatform.set('titleEmpty', !width);
      LayoutPlatform.set('titleLeftOffset', !width ? -8 : width / 2);
    }

    function _updateTitleArea(height, open) {
      LayoutPlatform.set('titleOpened', open);

      if (open) {
        var titleWidth = _$el.title.outerWidth() + 40;
        LayoutPlatform.set('titleBgLeftOffset', titleWidth / 2);
        LayoutPlatform.set('titleBgWidth', titleWidth);
        LayoutPlatform.set('titleBgHeight', height + 30);
      }
      else {
        LayoutPlatform.set('titleBgLeftOffset', 0);
        LayoutPlatform.set('titleBgWidth', 0);
      }
    }

    LayoutPlatform.on('titleOpen', function(args) {
      _updateTitleArea(args.height, true);
    });

    LayoutPlatform.on('titleClose', function(args) {
      _updateTitleArea(args.height, false);

      setTimeout(_updatePosition, 550);
    });

    LayoutPlatform.selectApp = function(name, fireFunc, callback) {
      if (!Title) {
        return;
      }

      Title.selectApp(name, fireFunc, callback);
    };

    LayoutPlatform.addApp = function(app, indexOrPosition) {
      if (!Title) {
        return;
      }

      Title.addTitle(app, indexOrPosition);
    };

    LayoutPlatform.removeApp = function(name) {
      if (!Title) {
        return;
      }

      Title.removeTitle(name);
    };

    setTimeout(function() {
      if (data.onloaded) {
        data.onloaded(LayoutPlatform);
      }

      LayoutPlatform.set('loaded', true);

      var beforeRequire = data.beforerequire || function(l, callback) {
        callback();
      };

      beforeRequire(LayoutPlatform, function() {
        LayoutPlatform.set('beforerequire', null);
        data.beforerequire = null;

        LayoutPlatform.set('start', true);

        LayoutPlatform.require().then(function() {
          _registerGroupedButtonsEvents('left', LayoutPlatform.findChild('data-pl-name', 'buttons-left'));
          _registerGroupedButtonsEvents('right', LayoutPlatform.findChild('data-pl-name', 'buttons-right'));

          _registerContextEvents('left', LayoutPlatform.findChild('data-pl-name', 'context-left'));
          _registerContextEvents('right', LayoutPlatform.findChild('data-pl-name', 'context-right'));

          Title = LayoutPlatform.findChild('name', 'pl-dropdown-title');

          _$el.title = _$el.platform.find('.pl-layout-title');
          _$el.titleText = _$el.platform.find('.pl-layout-title h2 span');

          _updatePosition();

          if (Title) {
            Title.on('open', function(args) {
              LayoutPlatform.fire('titleOpen', args);
            });

            Title.on('close', function(args) {
              LayoutPlatform.fire('titleClose', args);
            });

            Title.on('titleSelected', function(args) {
              var cls = Page.get('cls') || [];
              cls = cls.filter(function(value) {
                return value.indexOf('app-') !== 0;
              });

              cls.push('app-' + args.title.name
                .toLowerCase()
                .replace(/[^a-z0-9]/gi, '')
              );

              Page.set('cls', cls);
            });

            Title.fireSelected();
          }

          done();

          setTimeout(function() {
            _$el.platform.find('.pl-layout-mask').remove();
          });
        });
      });
    });
  });

})();
