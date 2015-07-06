(function() {
  'use strict';

  window.Ractive.controller('layout', function(component, data, el, config, done) {
    var uses = ['usebrand', 'usetitle', 'useprofile', 'usehelp', 'usemask'],
        Title = null;

    data.loaded = false;

    for (var i = 0; i < uses.length; i++) {
      var use = uses[i];

      data[use] = typeof data[use] == 'undefined' ? true : data[use];
      data[use] = data[use] == 'true' ? true : data[use];
      data[use] = data[use] == 'false' ? false : data[use];
    }

    var layout = component({
      data: data
    });

    layout.selectApp = function(name, fireFunc, callback) {
      if (!Title) {
        return;
      }

      Title.selectApp(name, fireFunc, callback);
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
              for (var i = 0; i < layout.childrenRequire.length; i++) {
                if (layout.childrenRequire[i].el.getAttribute('name') == 'dropdown-title') {
                  Title = layout.childrenRequire[i];
                }
              }

              if (Title) {
                Title.on('open', function(args) {
                  layout.fire('titleOpen', args);
                });

                Title.on('close', function(args) {
                  layout.fire('titleClose', args);
                });
              }

              done();
            });
          });
        }, 550);

      }, 1500);
    });
  });

})();
