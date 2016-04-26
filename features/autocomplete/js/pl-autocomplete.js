(function() {
  'use strict';

  window.Ractive.controller('pl-autocomplete', function(component, data, el, config, done) {

    var Autocomplete = component({
          plName: 'pl-autocomplete',
          data: $.extend(true, {
            focused: false,
            inEdition: false,
            listfocused: -1,
            listTop: 0,
            listWidth: 0,
            listHeight: 0,
            selection: ''
          }, data),
          partials: $.extend(true, {
            templateDefault: [
            '<div',
              ' class="pl-autocomplete-list-item {{listfocused == @index ? \'focused\' : \'\'}}"',
              ' on-mousedown="selectListItem"',
              ' on-mouseenter="enterListItem"',
            '>',
              '{{{display}}}',
            '</div>'
            ].join('')
          }, config.partials),

          refresh: function() {
            _refresh();
          },

          clear: function() {
            _$el.input.val('');

            _change(event);
          },

          focus: function() {
            _$el.input.focus();
          }
        }),
        _$el = {
          window: $(window),
          input: $(Autocomplete.el).find('.pl-autocomplete-input'),
          selection: $(Autocomplete.el).find('.pl-autocomplete-selection'),
          list: $(Autocomplete.el).find('.pl-autocomplete-list'),
          listContent: $(Autocomplete.el).find('.pl-autocomplete-list-content')
        };

    function _refresh() {
      var top = _$el.input.offset().top,
          width = _$el.input.outerWidth(),
          height = _$el.input.outerHeight();

      Autocomplete.set('inEdition', Autocomplete.get('focused') && Autocomplete.get('list') && Autocomplete.get('list').length);

      Autocomplete.set('listWidth', width);
      Autocomplete.set('listHeight', Autocomplete.get('focused') ? _$el.listContent.outerHeight() : 0);

      if (top + (height - 2) + Autocomplete.get('listHeight') > _$el.window.height()) {
        Autocomplete.set('listFromBottom', true);
        Autocomplete.set('listTop', -Autocomplete.get('listHeight') + 2);
      }
      else {
        Autocomplete.set('listFromBottom', false);
        Autocomplete.set('listTop', height - 2);
      }

      Autocomplete.set('selectionWidth', width);
    }

    function _select(event) {
      var select = Autocomplete.get('select');
      if (select) {
        select(event, _$el.input.val(), Autocomplete);
      }
    }

    function _change(event) {
      var change = Autocomplete.get('change');
      if (change) {
        change(event, _$el.input.val(), Autocomplete);
      }
    }

    function _charCode(event) {
      return event.original.charCode ? event.original.charCode : event.original.keyCode;
    }

    Autocomplete.partials.template = Autocomplete.partials.template || Autocomplete.partials.templateDefault;

    Autocomplete.on('enterListItem', function(event) {
      var list = Autocomplete.get('list'),
          listfocused = parseInt(event.keypath.substring(event.keypath.lastIndexOf('.') + 1), 10);

      Autocomplete.set('listfocused', listfocused);
      Autocomplete.set('selection', list && list.length && list[listfocused].value || '');
    });

    Autocomplete.on('selectListItem', function(event) {
      event.original.stopPropagation();
      event.original.preventDefault();

      _$el.input.val(event.context.value);

      _change(event);
      _select(event);
    });

    Autocomplete.on('inputFocus', function(event) {
      Autocomplete.set('focused', true);

      _refresh();

      var focus = Autocomplete.get('focus');
      if (focus) {
        focus(event, _$el.input.val(), Autocomplete);
      }
    });

    Autocomplete.on('inputBlur', function(event) {
      Autocomplete.set('focused', false);

      _refresh();

      var blur = Autocomplete.get('blur');
      if (blur) {
        blur(event, _$el.input.val(), Autocomplete);
      }
    });

    Autocomplete.on('inputKeydown', function(event) {
      var charCode = _charCode(event);

      if (charCode == 9) {
        var selection = Autocomplete.get('selection');

        if (selection) {
          event.original.stopPropagation();
          event.original.preventDefault();

          _$el.input.val(selection);

          _change(event);

          return;
        }
      }

      var keydown = Autocomplete.get('keydown');
      if (keydown) {
        keydown(event, Autocomplete);
      }
    });

    Autocomplete.on('inputKeyup', function(event) {
      var keyup = Autocomplete.get('keyup');
      if (keyup) {
        if (keyup(event, Autocomplete) === false) {
          return;
        }
      }

      var charCode = _charCode(event),
          selection = Autocomplete.get('selection'),
          list = Autocomplete.get('list'),
          listfocused = Autocomplete.get('listfocused');

      // Right
      if (charCode == 39 && selection) {
        _$el.input.val(selection);

        _change(event);

        return;
      }

      // Top - Bottom
      if ((charCode == 38 || charCode == 40) && list && list.length) {
        listfocused = listfocused + (charCode == 38 ? -1 : 1);
        listfocused = listfocused == -2 ? list.length - 1 : listfocused;
        listfocused = listfocused == list.length ? -1 : listfocused;

        Autocomplete.set('listfocused', listfocused);
        Autocomplete.set('selection', list && list.length && list[listfocused].value || '');

        return;
      }

      // Enter
      if (charCode == 13) {
        if (!list || !list.length || listfocused === -1) {
          _select(event);
        }
        else if (list && list.length && list[listfocused]) {
          _$el.input.val(list[listfocused].value);

          Autocomplete.set('listfocused', -1);

          _change(event);
          _select(event);
        }

        return;
      }

      _change(event);
    });

    Autocomplete.observe('list', function(list) {
      Autocomplete.set('selection', list && list.length && list[0].value || '');
      Autocomplete.set('listfocused', -1);

      setTimeout(_refresh);
    });

    done();
  });

})();
