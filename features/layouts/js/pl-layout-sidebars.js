(function() {
  'use strict';

  window.Ractive.controller('pl-layout-sidebars', function(component, data, el, config, done) {
    var DIRECTIONS = ['left', 'right'],

        freezeSet = false;

    $.each(DIRECTIONS, function(i, dir) {
      data[dir + 'ContentUsed'] = config && config.partials && config.partials[dir + '-content'];
      data[dir + 'ContentPos'] = 0;
      data[dir + 'ContentCollapsedAfter'] = false;
      data[dir + 'ContentWidth'] = typeof data[dir + '-content-width'] != 'undefined' ? data[dir + '-content-width'] : 300;
      data[dir + 'ContentAreaWidth'] = data[dir + 'ContentUsed'] ? data[dir + 'ContentWidth'] : 30;
      data[dir + 'ContentExpended'] = false;
    });

    var LayoutSidebars = component({
          plName: 'pl-layout-sidebars',
          data: data
        }),
        parentPlatform = LayoutSidebars.findParent('name', 'pl-layout-platform'),
        _$el = {
          window: $(window),
          layout: $(LayoutSidebars.el),
          content: $(LayoutSidebars.el).find('.pl-layout-content')
        };

    if (parentPlatform) {
      parentPlatform.on('titleAreaHeightChanged', function(args) {
        LayoutSidebars.set('titleAreaHeight', args.height);

        _fireContentResize(args.waiting);
      });

      LayoutSidebars.set('titleAreaHeight', parentPlatform.get('titleAreaHeight'));
    }

    function _fireContentResize(waiting) {
      LayoutSidebars.fire('contentResize', {
        width: _$el.window.width() - LayoutSidebars.get('leftContentAreaWidth') - LayoutSidebars.get('rightContentAreaWidth'),
        height: _$el.content.outerHeight(),
        waiting: typeof waiting == 'undefined' ? 550 : waiting
      });
    }

    function _refreshDirContent(dir, expended, updateContentExpended) {
      if (freezeSet) {
        return;
      }

      updateContentExpended = updateContentExpended === false ? false : true;

      freezeSet = true;

      var $dirContent = _$el.layout.find('.pl-layout-' + dir + '-container'),
          $bar = $dirContent.find('.pl-layout-' + dir + '-bar-container'),
          dirContentWidth = $dirContent.width() || 0,
          barWidth = $bar.width() || 0;

      if (updateContentExpended) {
        LayoutSidebars.set(dir + '-content-expended', expended);
      }

      LayoutSidebars.set(dir + 'ContentExpended', expended);
      LayoutSidebars.set(dir + 'ContentAreaWidth', expended ? dirContentWidth : barWidth);
      LayoutSidebars.set(dir + 'ContentPos', expended ? 0 : -dirContentWidth + barWidth);

      _fireContentResize();

      if (expended) {
        LayoutSidebars.set(dir + 'ContentCollapsedAfter', false);
      }
      else if (updateContentExpended) {
        setTimeout(function() {
          LayoutSidebars.set(dir + 'ContentCollapsedAfter', true);
        }, 550);
      }

      freezeSet = false;
    }

    $.each(DIRECTIONS, function(i, dir) {
      LayoutSidebars.set(dir + 'NoAnimation', true);
      _refreshDirContent(dir, data[dir + 'ContentExpended'], false);
      LayoutSidebars.set(dir + 'NoAnimation', false);

      LayoutSidebars.observe(dir + '-content-expended', function(newValue) {
        if (freezeSet) {
          return;
        }

        var expended = !LayoutSidebars.get(dir + 'ContentUsed') || newValue === false || (newValue && newValue == 'false') ? false : true;

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

        newValue = typeof newValue == 'undefined' ? 300 : newValue;

        var expended = !!LayoutSidebars.get(dir + 'ContentExpended');

        LayoutSidebars.set(dir + 'NoAnimation', !expended ? true : false);

        LayoutSidebars.set(dir + 'ContentWidth', newValue ? parseInt(newValue, 10) : 0);

        _refreshDirContent(dir, expended);

        LayoutSidebars.set(dir + 'NoAnimation', false);
      });
    });

    LayoutSidebars.on('toggleLeftBar toggleRightBar', function(event) {
      var dir = event.name == 'toggleLeftBar' ? 'left' : 'right',
          expended = !LayoutSidebars.get(dir + 'ContentExpended');

      _refreshDirContent(dir, expended);
    });

    LayoutSidebars.require().then(done);
  });

})();
