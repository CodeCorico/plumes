(function() {
  'use strict';

  window.Ractive.controller('layout', function(component, data, el, config, done) {
    var _uses = ['usebrand', 'usetitle', 'useprofile', 'usehelp', 'usemask'],
        _dirs = ['left', 'right'],
        _freezeSet = false,
        Title = null;

    $.each(_dirs, function(i, dir) {
      data[dir + 'ContentUsed'] = config && config.partials && config.partials[dir + '-content'];
      data[dir + 'ContentPos'] = 0;
      data[dir + 'ContentCollapsedAfter'] = false;
      data[dir + 'ContentAreaWidth'] = data[dir + 'ContentUsed'] ? data[dir + 'ContentWidth'] : 30;
    });

    data.titleAreaHeight = 90;

    data.loaded = false;

    for (var i = 0; i < _uses.length; i++) {
      var use = _uses[i];

      data[use] = typeof data[use] == 'undefined' ? true : data[use];
      data[use] = data[use] == 'true' ? true : data[use];
      data[use] = data[use] == 'false' ? false : data[use];
    }

    var layout = component({
          data: data
        }),
        page = layout.parentRequire,
        _$el = {
          window: $(window),
          layout: $(layout.el),
          content: $(layout.el).find('.layout-content')
        };

    function _refreshDirContent(dir, expended) {
      _freezeSet = true;

      var $dirContent = _$el.layout.find('.layout-' + dir + '-container'),
          $bar = $dirContent.find('.layout-' + dir + '-bar-container');

      layout.set(dir + 'ContentExpended', expended);
      layout.set(dir + '-content-expended', expended);
      layout.set(dir + 'ContentAreaWidth', expended ? $dirContent.width() : $bar.width());
      layout.set(dir + 'ContentPos', expended ? 0 : -$dirContent.width() + $bar.width());

      layout.fire('contentResize', {
        width: _$el.window.width() - layout.get('leftContentAreaWidth') - layout.get('rightContentAreaWidth'),
        height: _$el.content.outerHeight(),
        waiting: 550
      });

      if (expended) {
        layout.set(dir + 'ContentCollapsedAfter', false);
      }
      else {
        setTimeout(function() {
          layout.set(dir + 'ContentCollapsedAfter', true);
        }, 550);
      }

      _freezeSet = false;
    }

    $.each(_dirs, function(i, dir) {
      layout.observe(dir + '-content-expended', function(newValue) {
        if (_freezeSet) {
          return;
        }

        var expended = newValue === false || (newValue && newValue == 'false') ? false : true;

        _refreshDirContent(dir, expended);
      });

      layout.observe(dir + '-content-title', function(newValue) {
        if (_freezeSet) {
          return;
        }

        layout.set(dir + 'ContentTitle', newValue || null);
      });

      layout.observe(dir + '-content-width', function(newValue) {
        if (_freezeSet) {
          return;
        }

        layout.set(dir + 'ContentWidth', newValue ? parseInt(newValue, 10) : 0);

        _refreshDirContent(dir, !!layout.get(dir + 'ContentExpended'));
      });
    });

    layout.on('toggleLeftBar toggleRightBar', function(event) {
      var dir = event.name == 'toggleLeftBar' ? 'left' : 'right',
          expended = !layout.get(dir + 'ContentExpended');

      _refreshDirContent(dir, expended);
    });

    _refreshDirContent('left', data.leftContentExpended);
    _refreshDirContent('right', data.rightContentExpended);

    layout.on('titleOpen', function(args) {
      layout.set('titleAreaHeight', args.height + 50);
    });

    layout.on('titleClose', function(args) {
      layout.set('titleAreaHeight', args.height + 50);
    });

    layout.selectApp = function(name, fireFunc, callback) {
      if (!Title) {
        return;
      }

      Title.selectApp(name, fireFunc, callback);
    };

    layout.addApp = function(app, indexOrPosition) {
      if (!Title) {
        return;
      }

      Title.addTitle(app, indexOrPosition);
    };

    layout.removeApp = function(name) {
      if (!Title) {
        return;
      }

      Title.removeTitle(name);
    };

    setTimeout(function() {
      if (data.onloaded) {
        data.onloaded(layout);
      }

      layout.set('loaded', true);

      setTimeout(function() {
        layout.set('beforeStart', true);

        setTimeout(function() {
          $('.layout-mask').remove();

          var beforeRequire = data.beforerequire || function(l, callback) {
            callback();
          };

          beforeRequire(layout, function() {
            layout.set('beforerequire', null);
            data.beforerequire = null;

            layout.set('start', true);

            layout.require().then(function() {
              var Title = layout.findChild('name', 'dropdown-title');

              if (Title) {
                Title.on('open', function(args) {
                  layout.fire('titleOpen', args);
                });

                Title.on('close', function(args) {
                  layout.fire('titleClose', args);
                });

                Title.on('titleSelected', function(args) {
                  var cls = page.get('cls') || [];
                  cls = cls.filter(function(value) {
                    return value.indexOf('app-') !== 0;
                  });

                  cls.push('app-' + args.title.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]/gi, '')
                  );

                  page.set('cls', cls);
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
