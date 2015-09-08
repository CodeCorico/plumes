(function() {
  'use strict';

  window.Ractive.controller('layout', function(component, data, el, config, done) {
    var uses = ['usebrand', 'usetitle', 'useprofile', 'usehelp', 'usemask'],
        Title = null;

    $.each(['left', 'right'], function(i, dir) {
      data[dir + 'ContentUsed'] = config && config.partials && config.partials[dir + '-content'];
      data[dir + 'ContentExpended'] = data[dir + '-content-expended'] && data[dir + '-content-expended'] == 'false' ? false : true;
      data[dir + 'ContentTitle'] = data[dir + '-content-title'] || null;
      data[dir + 'ContentWidth'] = data[dir + '-content-width'] ? parseInt(data[dir + '-content-width'], 10) : 0;
      data[dir + 'ContentPos'] = 0;
      data[dir + 'ContentCollapsedAfter'] = false;
      data[dir + 'ContentAreaWidth'] = data[dir + 'ContentUsed'] ? data[dir + 'ContentWidth'] : 30;
    });

    data.titleAreaHeight = 90;

    data.loaded = false;

    for (var i = 0; i < uses.length; i++) {
      var use = uses[i];

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
          content: $(layout.el).find('.layout-content')
        };

    function _refreshDirContent($bar, dir, expended) {
      if (!$bar || !$bar.length) {
        return;
      }

      var $dirContent = $bar.parents('.layout-' + dir + '-container');

      layout.set(dir + 'ContentExpended', expended);
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
    }

    layout.on('toggleLeftBar toggleRightBar', function(event) {
      var dir = event.name == 'toggleLeftBar' ? 'left' : 'right',
          expended = !layout.get(dir + 'ContentExpended');

      _refreshDirContent($(event.node), dir, expended);
    });

    _refreshDirContent($(layout.el).find('.layout-left-bar-container'), 'left', data.leftContentExpended);
    _refreshDirContent($(layout.el).find('.layout-right-bar-container'), 'right', data.rightContentExpended);

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
