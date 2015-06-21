(function() {
  'use strict';

  window.Ractive.controller('grouped-list', function(component, data, el, config, done) {
    data.lvl = 0;
    data.level = function(keypath) {
      return keypath.split('items').length - 2;
    };

    var GroupedList = component({
      data: data
    });

    var _$el = {
          window: $(window),
          list: $(GroupedList.el).find('.grouped-list'),
          content: $(GroupedList.el).find('.grouped-list-content')
        };

    function _refresh() {
      GroupedList.fire('refresh');
    }

    GroupedList.on('refresh', function() {
      var scrollTop = _$el.list.get(0).scrollTop;

      _$el.content.children().each(function() {
        var $item = $(this),
            level = $item.data('level');

        $item.css('top', '');

        var top = $item.position().top;

        if (level !== 0) {
          var $prev = $($item.prevAll('.level-' + (level - 1)).get(0));
          scrollTop = Math.max(top, $prev.position().top + $prev.outerHeight(true));
        }

        if (top < scrollTop) {
          var height = $item.outerHeight(true),
              $next = $item.find('~ .grouped-list-item').filter(function() {
                return $(this).data('level') <= level;
              });
          $next = $next.length ? $($next.get(0)) : null;
          var nextTop = $next ? $next.position().top - height : _$el.list.outerHeight() - height;

          $item.css({
            'z-index': 9999 - level,
            top: Math.min(scrollTop, nextTop) - top
          });
        }
      });
    });

    _$el.list.scroll(_refresh);

    _$el.window.resize(_refresh);

    GroupedList.on('teardown', function() {
      _$el.window.off('resize', _refresh);
    });

    GroupedList.observe('items', _refresh);

    _refresh();

    done();
  });

})();
