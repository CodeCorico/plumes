(function() {
  'use strict';

  window.Ractive.controller('pl-dropdown-title', function(component, data, el, config, done) {

    data.selected = {
      name: '',
      index: 0
    };
    data.opened = false;

    if (data.titles) {
      $.each(data.titles, function(i) {
        if (this.selected) {
          data.selected.index = i;
          data.selected.name = this.name;
        }
      });
    }

    var DropdownTitle = component({
          plName: 'pl-dropdown-title',
          data: data,
          select: _select
        }),
        _$el = {
          body: $('body'),
          dropdownTitle: $(DropdownTitle.el)
        };

    function _select(indexOrName, fireFunc, callback) {
      if (!DropdownTitle) {
        return;
      }

      fireFunc = typeof fireFunc == 'undefined' ? true : fireFunc;

      var titles = DropdownTitle.get('titles'),
          titleToSelect = null;

      $.each(titles, function(i, title) {
        if (typeof indexOrName == 'string' && indexOrName == title.name) {
          indexOrName = i;
        }

        title.selected = i === indexOrName;

        if (i === indexOrName) {
          titleToSelect = title;
        }
      });

      DropdownTitle.set('titles', titles);

      DropdownTitle.set('selected.index', indexOrName);
      DropdownTitle.set('selected.name', data.titles[indexOrName].name);
      DropdownTitle.set('noAnimation', true);

      setTimeout(function() {
        _close(function() {
          if (fireFunc) {
            titleToSelect.select();
            DropdownTitle.fire('titleSelected', {
              title: titleToSelect
            });
          }

          if (callback) {
            callback();
          }
        });
      });
    }

    function _close(callback) {
      DropdownTitle.fire('close', {
        height: _$el.dropdownTitle.find('.pl-dropdown-title h2').height()
      });

      DropdownTitle.set('noAnimation', false);
      DropdownTitle.set('noCaret', true);
      DropdownTitle.set('opened', false);

      setTimeout(function() {
        DropdownTitle.set('noCaret', false);

        if (callback) {
          callback();
        }
      }, 550);
    }

    function _click() {
      _close();
    }

    DropdownTitle.fireSelected = function() {
      var selected = DropdownTitle.get('selected');

      if (selected) {
        DropdownTitle.fire('titleSelected', {
          title: DropdownTitle.get('titles')[selected.index]
        });
      }
    };

    DropdownTitle.toggle = function() {
      if (data.titles.length < 2) {
        return;
      }

      if (DropdownTitle.get('opened')) {
        var selected = DropdownTitle.get('selected');

        if (selected && typeof selected.index == 'number') {
          _select(selected.index);
        }
        else {
          _close();
        }
      }
      else {
        DropdownTitle.fire('open', {
          height: _$el.dropdownTitle.find('.pl-dropdown-title h2').height() * (data.titles.length + 1)
        });
        DropdownTitle.set('opened', true);
      }
    };

    DropdownTitle.on('mainClick', function(event) {
      event.original.stopPropagation();
    });

    DropdownTitle.on('toggle', function(event) {
      DropdownTitle.toggle();
      event.original.stopPropagation();
    });

    DropdownTitle.selectApp = function(name, fireFunc, callback) {
      _select(name, fireFunc, callback);

      return DropdownTitle;
    };

    DropdownTitle.addTitle = function(title, indexOrPosition) {
      var titles = DropdownTitle.get('titles');

      indexOrPosition = typeof indexOrPosition == 'undefined' ? titles.length : indexOrPosition;

      if (typeof indexOrPosition == 'string') {
        indexOrPosition = indexOrPosition == 'top' ? 0 : titles.length;
      }

      titles.splice(indexOrPosition, 0, title);

      DropdownTitle.set('titles', titles);

      return DropdownTitle;
    };

    DropdownTitle.removeTitle = function(name) {
      var titles = DropdownTitle.get('titles');

      for (var i = 0; i < titles.length; i++) {
        if (titles[i].name == name) {
          titles.splice(i, 1);
          break;
        }
      }

      DropdownTitle.set('titles', titles);

      return DropdownTitle;
    };

    DropdownTitle.on('teardown', function() {
      _$el.body.unbind('click', _click);
    });

    _$el.body.click(_click);

    done();
  });

})();
