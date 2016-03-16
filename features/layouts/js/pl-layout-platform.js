(function() {
  'use strict';

  window.Ractive.controller('pl-layout-platform', function(component, data, el, config, done) {
    var sectionsUsed = ['usebrand', 'usetitle', 'useprofile', 'usehelp', 'usemask', 'usenotifications'],
        Title = null;

    data.loaded = false;

    for (var i = 0; i < sectionsUsed.length; i++) {
      var use = sectionsUsed[i];

      data[use] = typeof data[use] == 'undefined' ? true : data[use];
      data[use] = data[use] == 'true' ? true : data[use];
      data[use] = data[use] == 'false' ? false : data[use];
    }

    var LayoutPlateform = component({
          plName: 'pl-layout-plateform',
          data: $.extend(true, {
            titleLeftOffset: 0,
            titleBgLeftOffset: 0,
            titleBgWidth: 0,
            titleBgHeight: 0
          }, data)
        }),
        Page = LayoutPlateform.parentRequire,
        _$el = {
          plateform: $(LayoutPlateform.el)
        };

    function _update() {
      LayoutPlateform.set('titleLeftOffset', _$el.titleText.outerWidth() / 2);
    }

    function _updateTitleArea(height, open) {
      LayoutPlateform.set('titleOpened', open);

      if (open) {
        var titleWidth = _$el.title.outerWidth() + 40;
        LayoutPlateform.set('titleBgLeftOffset', titleWidth / 2);
        LayoutPlateform.set('titleBgWidth', titleWidth);
        LayoutPlateform.set('titleBgHeight', height + 30);
      }
      else {
        LayoutPlateform.set('titleBgLeftOffset', 0);
        LayoutPlateform.set('titleBgWidth', 0);
      }
    }

    LayoutPlateform.on('titleOpen', function(args) {
      _updateTitleArea(args.height, true);
    });

    LayoutPlateform.on('titleClose', function(args) {
      _updateTitleArea(args.height, false);

      _update();
    });

    LayoutPlateform.selectApp = function(name, fireFunc, callback) {
      if (!Title) {
        return;
      }

      Title.selectApp(name, fireFunc, callback);
    };

    LayoutPlateform.addApp = function(app, indexOrPosition) {
      if (!Title) {
        return;
      }

      Title.addTitle(app, indexOrPosition);
    };

    LayoutPlateform.removeApp = function(name) {
      if (!Title) {
        return;
      }

      Title.removeTitle(name);
    };

    setTimeout(function() {
      if (data.onloaded) {
        data.onloaded(LayoutPlateform);
      }

      LayoutPlateform.set('loaded', true);

      var beforeRequire = data.beforerequire || function(l, callback) {
        callback();
      };

      beforeRequire(LayoutPlateform, function() {
        LayoutPlateform.set('beforerequire', null);
        data.beforerequire = null;

        LayoutPlateform.set('start', true);

        LayoutPlateform.require().then(function() {
          Title = LayoutPlateform.findChild('name', 'pl-dropdown-title');

          _$el.title = _$el.plateform.find('.pl-layout-title');
          _$el.titleText = _$el.plateform.find('.pl-layout-title h2 span');

          _update();

          if (Title) {
            Title.on('open', function(args) {
              LayoutPlateform.fire('titleOpen', args);
            });

            Title.on('close', function(args) {
              LayoutPlateform.fire('titleClose', args);
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
            _$el.plateform.find('.pl-layout-mask').remove();
          });
        });
      });
    });
  });

})();
