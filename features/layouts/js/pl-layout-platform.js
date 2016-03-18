(function() {
  'use strict';

  window.Ractive.controller('pl-layout-platform', function(component, data, el, config, done) {
    var Title = null;

    function _closeContext(orientation) {
      var panel = LayoutPlatform.findChild('data-pl-name', 'context-' + orientation);

      panel.close();
    }

    function _beforeButtonsAction(args) {
      if (!args || !args.button || !args.button.context) {
        return;
      }

      var panel = LayoutPlatform.findChild('data-pl-name', 'context-' + args.button.context);
      if (!panel) {
        return;
      }

      if (args.button.beforeContext) {
        args.button.beforeContext(panel, function callback() {
          panel.open();
        });
      }
      else {
        panel.open();
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
            contextleftscrollbar: true,
            contextrightscrollbar: true,
            crossleftcontext: function() {
              _closeContext('left');
            },
            crossrightcontext: function() {
              _closeContext('right');
            }
          }, data)
        }),
        Page = LayoutPlatform.parentRequire,
        _$el = {
          platform: $(LayoutPlatform.el)
        };

    window.Ractive.useBinds(LayoutPlatform, ['mask']);

    function _updatePosition() {
      LayoutPlatform.set('titleLeftOffset', _$el.titleText.outerWidth() / 2);
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
          LayoutPlatform.findChild('data-pl-name', 'buttons-left').on('beforeAction', _beforeButtonsAction);
          LayoutPlatform.findChild('data-pl-name', 'buttons-right').on('beforeAction', _beforeButtonsAction);

          Title = LayoutPlatform.findChild('name', 'pl-dropdown-title');

          window.A1 = LayoutPlatform;

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
