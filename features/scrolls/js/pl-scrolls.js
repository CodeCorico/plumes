(function() {
  'use strict';

  window.Ractive.controller('pl-scrolls', function(component, data, el, config, done) {

    var PAGE_SIZE = 268,

        _inDrag = false,
        _mousewheelBinds = ('onwheel' in document || document.documentMode >= 9) ?
          ['wheel'] :
          ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];

    if (typeof window.Ractive.plScrollsWidth == 'undefined') {
      var $tester = $('<div/>')
        .css({
          overflow: 'auto',
          visibility: 'hidden',
          height: 10,
          width: 100
        })
        .html('<div style="height: 20px; width: 100%"></div>');

      $('body').append($tester);
      var width = Math.ceil(100 - $tester.find('div').width());
      $tester.remove();

      var sheet = window.document.styleSheets[0];

      if (sheet.insertRule) {
        sheet.insertRule('.pl-scrolls { margin-right: -' + width + 'px; }', sheet.cssRules.length);
      }
      else {
        sheet.addRule('.pl-scrolls', 'margin-right: -' + width + 'px;', -1);
      }

      window.Ractive.plScrollsWidth = width;
    }

    function _update() {
      var area = _$el.container.prop('scrollHeight'),
          max = _$el.vertical.outerHeight(),
          height = max * 100 / area;

      Scrolls.set('active', area > max);
      Scrolls.set('height', height);
      _scroll();
    }

    function _scroll() {
      var area = _$el.container.prop('scrollHeight'),
          scrollTop = _$el.container.scrollTop(),
          top = scrollTop * 100 / area;

      Scrolls.set('top', top);
    }

    function _topPX() {
      return _$el.verticalTicker.offset().top - _$el.vertical.offset().top;
    }

    function _mousedown(event) {
      _inDrag = {
        scrollTop: _$el.container.scrollTop(),
        pageY: event.pageY
      };

      Scrolls.set('inDrag', true);

      event.preventDefault();
      event.stopPropagation();
    }

    function _mousemove(event) {
      if (!_inDrag) {
        return;
      }

      var area = _$el.container.prop('scrollHeight'),
          max = _$el.vertical.outerHeight(),
          scrollTop = _inDrag.scrollTop + ((event.pageY - _inDrag.pageY) * area / max);

      _$el.container.scrollTop(scrollTop);

      event.preventDefault();
      event.stopPropagation();
    }

    function _mouseup() {
      _inDrag = false;
      Scrolls.set('inDrag', false);
    }

    function _mouseenter() {
      _update();
      Scrolls.set('enter', true);
    }

    function _mouseleave() {
      Scrolls.set('enter', false);
    }

    var Scrolls = component({
          plName: 'pl-scrolls',
          data: $.extend(true, {
            top: 0,
            height: 0,
            active: false,
            hover: false,
            inDrag: false,
            enter: false
          }, data),

          update: _update
        }),
        _$el = {
          body: $('body'),
          scrolls: $(Scrolls.el),
          vertical: $(Scrolls.el).find('.pl-scrolls-vertical'),
          verticalTicker: $(Scrolls.el).find('.pl-scrolls-vertical-ticker'),
          container: $(Scrolls.el).next('.pl-scrolls')
        };

    Scrolls.on('teardown', function() {
      _$el.container.off('scroll', _scroll);
      _$el.body.off('mousemove', _mousemove);
      _$el.body.off('mouseup', _mouseup);
      _$el.container.off('mouseenter', _mouseenter);
      _$el.container.off('mouseenter', _mouseleave);

      _$el = null;
      Scrolls = null;
    });

    _$el.container.scroll(_scroll);

    _$el.vertical.mouseenter(function() {
      Scrolls.set('hover', true);
    });

    _$el.vertical.mouseleave(function() {
      Scrolls.set('hover', false);
    });

    _$el.vertical.click(function(event) {
      if (event.target != _$el.vertical[0]) {
        return;
      }

      var top = _topPX(),
          scrollTop = _$el.container.scrollTop();

      _$el.container.scrollTop(scrollTop + (top > event.offsetY ? -PAGE_SIZE : PAGE_SIZE));
    });

    $.each(_mousewheelBinds, function(i, bind) {
      _$el.vertical.on(bind, function(event) {
        var cloneEvent = new window.WheelEvent(bind, event.originalEvent);

        if (document.createEvent) {
          _$el.container[0].dispatchEvent(cloneEvent);
        }
        else {
          _$el.container[0].fireEvent('on' + cloneEvent.eventType, cloneEvent);
        }
      });
    });

    _$el.verticalTicker.mousedown(_mousedown);
    _$el.body.mousemove(_mousemove);
    _$el.body.mouseup(_mouseup);

    _$el.container.mouseenter(_mouseenter);
    _$el.container.mouseleave(_mouseleave);

    _update();

    done();
  });

})();
