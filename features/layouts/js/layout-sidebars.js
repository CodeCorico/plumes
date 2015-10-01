(function() {
  'use strict';

  window.Ractive.controller('layout-sidebars', function(component, data, el, config, done) {
    var DIRECTIONS = ['left', 'right'],

        freezeSet = false;

    $.each(DIRECTIONS, function(i, dir) {
      data[dir + 'ContentUsed'] = config && config.partials && config.partials[dir + '-content'];
      data[dir + 'ContentPos'] = 0;
      data[dir + 'ContentCollapsedAfter'] = false;
      data[dir + 'ContentAreaWidth'] = data[dir + 'ContentUsed'] ? data[dir + 'ContentWidth'] : 30;
    });

    var LayoutSidebars = component({
          plName: 'pl-layout-sidebars',
          data: data
        }),
        parent = LayoutSidebars.parentRequire,
        _$el = {
          window: $(window),
          layout: $(LayoutSidebars.el),
          content: $(LayoutSidebars.el).find('.layout-content')
        };

    if (parent && parent.plName == 'pl-layout-plateform') {
      parent.on('titleAreaHeightChanged', function(args) {
        LayoutSidebars.set('titleAreaHeight', args.height);

        _fireContentResize(args.waiting);
      });

      LayoutSidebars.set('titleAreaHeight', parent.get('titleAreaHeight'));
    }

    function _fireContentResize(waiting) {
      LayoutSidebars.fire('contentResize', {
        width: _$el.window.width() - LayoutSidebars.get('leftContentAreaWidth') - LayoutSidebars.get('rightContentAreaWidth'),
        height: _$el.content.outerHeight(),
        waiting: typeof waiting == 'undefined' ? 550 : waiting
      });
    }

    function _refreshDirContent(dir, expended) {
      freezeSet = true;

      var $dirContent = _$el.layout.find('.layout-' + dir + '-container'),
          $bar = $dirContent.find('.layout-' + dir + '-bar-container');

      LayoutSidebars.set(dir + 'ContentExpended', expended);
      LayoutSidebars.set(dir + '-content-expended', expended);
      LayoutSidebars.set(dir + 'ContentAreaWidth', expended ? $dirContent.width() : $bar.width());
      LayoutSidebars.set(dir + 'ContentPos', expended ? 0 : -$dirContent.width() + $bar.width());

      _fireContentResize();

      if (expended) {
        LayoutSidebars.set(dir + 'ContentCollapsedAfter', false);
      }
      else {
        setTimeout(function() {
          LayoutSidebars.set(dir + 'ContentCollapsedAfter', true);
        }, 550);
      }

      freezeSet = false;
    }

    $.each(DIRECTIONS, function(i, dir) {
      LayoutSidebars.observe(dir + '-content-expended', function(newValue) {
        if (freezeSet) {
          return;
        }

        var expended = newValue === false || (newValue && newValue == 'false') ? false : true;

        _refreshDirContent(dir, expended);
      });

      LayoutSidebars.observe(dir + '-content-title', function(newValue) {
        if (freezeSet) {
          return;
        }

        LayoutSidebars.set(dir + 'ContentTitle', newValue || null);
      });

      LayoutSidebars.observe(dir + '-content-width', function(newValue) {
        if (freezeSet) {
          return;
        }

        LayoutSidebars.set(dir + 'ContentWidth', newValue ? parseInt(newValue, 10) : 0);

        _refreshDirContent(dir, !!LayoutSidebars.get(dir + 'ContentExpended'));
      });
    });

    LayoutSidebars.on('toggleLeftBar toggleRightBar', function(event) {
      var dir = event.name == 'toggleLeftBar' ? 'left' : 'right',
          expended = !LayoutSidebars.get(dir + 'ContentExpended');

      _refreshDirContent(dir, expended);
    });

    _refreshDirContent('left', data.leftContentExpended);
    _refreshDirContent('right', data.rightContentExpended);

    LayoutSidebars.set('start', true);

    LayoutSidebars.require().then(done);
  });

})();
