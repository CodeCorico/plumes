(function() {
  'use strict';

  window.Ractive.controller('layout-platform', function(component, data, el, config, done) {
    var sectionsUsed = ['usebrand', 'usetitle', 'useprofile', 'usehelp', 'usemask'],
        Title = null;

    data.titleAreaHeight = 90;
    data.loaded = false;

    for (var i = 0; i < sectionsUsed.length; i++) {
      var use = sectionsUsed[i];

      data[use] = typeof data[use] == 'undefined' ? true : data[use];
      data[use] = data[use] == 'true' ? true : data[use];
      data[use] = data[use] == 'false' ? false : data[use];
    }

    var LayoutPlateform = component({
          plName: 'pl-layout-plateform',
          data: data
        }),
        Page = LayoutPlateform.parentRequire;

    function _updateTitleAreaHeight(height) {
      height += 50;

      LayoutPlateform.set('titleAreaHeight', height);
      LayoutPlateform.fire('titleAreaHeightChanged', {
        height: height,
        waiting: 550
      });
    }

    LayoutPlateform.on('titleOpen', function(args) {
      _updateTitleAreaHeight(args.height);
    });

    LayoutPlateform.on('titleClose', function(args) {
      _updateTitleAreaHeight(args.height);
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

      setTimeout(function() {
        LayoutPlateform.set('beforeStart', true);

        setTimeout(function() {
          $(LayoutPlateform.el).find('.layout-mask').remove();

          var beforeRequire = data.beforerequire || function(l, callback) {
            callback();
          };

          beforeRequire(LayoutPlateform, function() {
            LayoutPlateform.set('beforerequire', null);
            data.beforerequire = null;

            LayoutPlateform.set('start', true);

            LayoutPlateform.require().then(function() {
              var Title = LayoutPlateform.findChild('name', 'dropdown-title');

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
            });
          });
        }, 550);

      }, 1500);
    });
  });

})();
