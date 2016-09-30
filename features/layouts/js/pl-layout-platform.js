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
      var screenWidth = _$el.window.width(),
          screen = LayoutPlatform.get('screen'),
          contentMedia = LayoutPlatform.get('contentMedia');

      if (screenWidth >= VIEWS.DESKTOP) {
        LayoutPlatform.set('leftContextWidth', LayoutPlatform.get('leftContextOpened') ? '25%' : 0);
        LayoutPlatform.set('rightContextWidth', LayoutPlatform.get('rightContextOpened') ? '25%' : 0);

        LayoutPlatform.set('contentLeft', LayoutPlatform.get('leftContextOpened') ? '25%' : 0);
        LayoutPlatform.set('contentRight', LayoutPlatform.get('rightContextOpened') ? '25%' : 0);

        if (_groupedButtons.left) {
          _groupedButtons.left.defaultMode();
        }
        if (_groupedButtons.right) {
          if (_useFullscreen() == 'mobile') {
            _removeFullscreenButton();
          }
          _groupedButtons.right.defaultMode();
        }

        LayoutPlatform.set('screen', 'screen-desktop');
      }
      else {
        if (openOrientation == 'left' && LayoutPlatform.get('rightContextOpened')) {
          _contexts.right.close(null, false);
          LayoutPlatform.set('rightContextOpened', false);
        }
        else if (openOrientation == 'right' && LayoutPlatform.get('leftContextOpened')) {
          _contexts.left.close(null, false);
          LayoutPlatform.set('leftContextOpened', false);
        }
        else if (LayoutPlatform.get('leftContextOpened') && LayoutPlatform.get('rightContextOpened')) {
          _contexts.right.close(null, false);
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
            if (_useFullscreen() == 'mobile') {
              _removeFullscreenButton();
            }
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
            if (_useFullscreen() == 'mobile') {
              _addFullscreenButton();
            }

            _groupedButtons.right.compactMode();
          }

          LayoutPlatform.set('screen', 'screen-mobile');
        }
      }

      var templateWidth = _$el.contentTemplate.outerWidth();

      if (templateWidth >= VIEWS.DESKTOP) {
        LayoutPlatform.set('contentMedia', 'media-desktop');
      }
      else if (templateWidth >= VIEWS.TABLET) {
        LayoutPlatform.set('contentMedia', 'media-tablet');
      }
      else if (templateWidth >= VIEWS.MOBILE) {
        LayoutPlatform.set('contentMedia', 'media-mobile');
      }

      _updateTitlePosition();

      if (screen != LayoutPlatform.get('screen')) {
        LayoutPlatform.fire('screen', {
          screen: LayoutPlatform.get('screen')
        });

        setTimeout(function() {
          LayoutPlatform.fire('afterScreen', {
            screen: LayoutPlatform.get('screen')
          });
        }, 250);
      }

      if (contentMedia != LayoutPlatform.get('contentMedia')) {
        LayoutPlatform.fire('contentMedia', {
          contentMedia: LayoutPlatform.get('contentMedia')
        });

        setTimeout(function() {
          LayoutPlatform.fire('afterContentMedia', {
            contentMedia: LayoutPlatform.get('contentMedia')
          });
        }, 250);
      }

      LayoutPlatform.fire('resize');

      setTimeout(function() {
        LayoutPlatform.fire('afterResize');
      }, 250);
    }

    function _useFullscreen() {
      var usefullscreen = LayoutPlatform.get('usefullscreen');
      usefullscreen = typeof usefullscreen == 'undefined' || usefullscreen == 'true' || usefullscreen === true || false;

      var usefullscreendesktop = LayoutPlatform.get('usefullscreendesktop');
      usefullscreendesktop = usefullscreendesktop == 'true' || usefullscreendesktop === true || false;

      return usefullscreen && usefullscreendesktop ? 'desktop' : (usefullscreen && !usefullscreendesktop ? 'mobile' : false);
    }

    function _closeContext(orientation, userBehavior) {
      var panel = LayoutPlatform.findChild('data-pl-name', 'context-' + orientation);

      panel.close(null, userBehavior);
    }

    function _hasFullscreenButton() {
      var buttonsRight = LayoutPlatform.get('buttonsright') || [],
          index = -1;

      for (var i = 0; i < buttonsRight.length; i++) {
        if (buttonsRight[i]['pl-layout-name'] && buttonsRight[i]['pl-layout-name'] == 'fullscreen') {
          index = i;

          break;
        }
      }

      return index;
    }

    function _addFullscreenButton() {
      var index = _hasFullscreenButton();

      if (index > -1) {
        return;
      }

      var buttonsRight = LayoutPlatform.get('buttonsright') || [];

      buttonsRight.unshift({
        'pl-layout-name': 'fullscreen',
        icon:
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement ?
          'fa fa-compress' :
          'fa fa-expand',
        action: function(button) {
          var $i = $(button.node).find('i');

          if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
          ) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
            else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            }
            else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }

            $i[0].className = 'fa fa-expand';

            LayoutPlatform.fire('fullscreen', {
              fullscreen: false
            });
          }
          else {
            if (document.body.requestFullscreen) {
              document.body.requestFullscreen();
            }
            else if (document.body.webkitRequestFullscreen) {
              document.body.webkitRequestFullscreen();
            }
            else if (document.body.mozRequestFullScreen) {
              document.body.mozRequestFullScreen();
            }
            else if (document.body.msRequestFullscreen) {
              document.body.msRequestFullscreen();
            }

            $i[0].className = 'fa fa-compress';

            LayoutPlatform.fire('fullscreen', {
              fullscreen: true
            });
          }
        }
      });

      LayoutPlatform.update('buttonsright');
    }

    function _removeFullscreenButton() {
      var index = _hasFullscreenButton();

      if (index < 0) {
        return;
      }

      var buttonsRight = LayoutPlatform.get('buttonsright') || [];

      buttonsRight.splice(index, 1);

      LayoutPlatform.update('buttonsright');
    }

    function _registerGroupedButtonsEvents(orientation, component) {
      _groupedButtons[orientation] = component;

      component.on('beforeAction', _beforeButtonsAction);
      component.on('beforeCompact', _beforeButtonsCompact);

      _resize();

      _groupedButtons[orientation].show();

      if (orientation == 'right' && _useFullscreen() == 'desktop') {
        _addFullscreenButton();
      }
    }

    function _registerContextEvents(orientation, component) {
      _contexts[orientation] = component;

      component.on('beforeOpen', function(event) {
        LayoutPlatform.set(orientation + 'ContextOpened', true);

        LayoutPlatform.fire(orientation + 'ContextOpened', {
          opened: true,
          component: component,
          userBehavior: event.userBehavior
        });

        _resize(orientation);
      });

      component.on('beforeClose', function() {
        $(component.el).find('.pl-group').removeClass('opened');
      });

      component.on('close', function(event) {
        LayoutPlatform.set(orientation + 'ContextOpened', false);

        LayoutPlatform.fire(orientation + 'ContextOpened', {
          opened: false,
          component: component,
          userBehavior: event.userBehavior
        });

        _resize();
      });

      component.on('closeIfGroupOpened', function(args) {
        if (!args || !args.$group) {
          return;
        }

        args.$group.removeClass('opened');
      });
    }

    function _displayContextGroup(orientation, context, $context, $group, userBehavior) {
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

      LayoutPlatform.fire('groupOpened', {
        orientation: orientation,
        context: context,
        $group: $group,
        userBehavior: userBehavior
      });

      context.open(null, userBehavior);
    }

    function _beforeButtonsAction(args) {
      if (!args || !args.button || (!args.button.context && !args.button.group)) {
        return;
      }

      if (args.button.group) {
        var beforeGroup = args.button.beforeGroup || function(context, $group, userBehavior, callback) {
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
            if (args.userBehavior) {
              return context.close(null, true);
            }

            return context.open(null, args.userBehavior);
          }

          beforeGroup(context, $group, args.userBehavior, function callback() {
            if (context.isOpened()) {
              context.closeContent(function callback() {
                _displayContextGroup(orientation, context, $context, $group, args.userBehavior);
              }, args.userBehavior);
            }
            else {
              _displayContextGroup(orientation, context, $context, $group, args.userBehavior);
            }
          });
        });
      }
      else if (args.button.context) {
        var context = _contexts[args.button.context];
        if (!context) {
          return;
        }

        var beforeContext = args.button.beforeContext || function(context, callback) {
          callback();
        };

        beforeContext(context, function callback() {
          context.open(null, args.userBehavior);
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
            titleShowed: true,
            titleLeft: 50,
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
              _closeContext('left', true);
            },
            crossrightcontext: function() {
              _closeContext('right', true);
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
          },

          closeOnNotDesktop: function(groups) {
            groups = typeof groups == 'string' ? [groups] : groups;

            if (LayoutPlatform.get('screen') != 'screen-desktop') {
              groups.forEach(function(group) {
                LayoutPlatform.leftContext().closeIfGroupOpened(group);
                LayoutPlatform.rightContext().closeIfGroupOpened(group);
              });
            }
          }
        }),
        Page = LayoutPlatform.parentRequire,
        _$el = {
          window: $(window),
          platform: $(LayoutPlatform.el),
          content: $(LayoutPlatform.el).find('.pl-layout-platform-content'),
          contentTemplate: $(LayoutPlatform.el).find('.pl-layout-platform-content-template')
        };

    window.Ractive.Plumes.bindUses(LayoutPlatform, ['mask']);

    LayoutPlatform.observe('title-showed', function(value) {
      value = value === false || value == 'false' ? false : true;

      LayoutPlatform.set('titleShowed', value);
    });

    _$el.window.resize(_resize);

    LayoutPlatform.on('teardown', function() {
      _$el.window.off('resize', _resize);
    });

    _resize();

    function _updateTitlePosition() {
      if (!_$el.titleText) {
        return;
      }

      var width = _$el.titleText.outerWidth(),
          screen = LayoutPlatform.get('screen');

      LayoutPlatform.set('titleEmpty', !width);
      LayoutPlatform.set('titleLeft',
        screen == 'screen-desktop' ? (
          50 +
          (LayoutPlatform.get('leftContextOpened') ? 12.5 : 0) -
          (LayoutPlatform.get('rightContextOpened') ? 12.5 : 0)
        ) : 50
      );

      LayoutPlatform.set('titleLeftOffset', !width ? -8 : -(width / 2));
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

      setTimeout(_updateTitlePosition, 550);
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

      var beforeRequire = data.beforerequire || function(layout, callback) {
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

          _updateTitlePosition();

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
