(function() {
  'use strict';

  window.Ractive.controller('dropdown-title', function(component, data, el, config, done) {

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

    function _close() {
      dropdownTitle.fire('close', {
        height: $(el).find('.dropdown-title h2').height()
      });

      dropdownTitle.set('noAnimation', false);
      dropdownTitle.set('noCaret', true);
      dropdownTitle.set('opened', false);

      setTimeout(function() {
        dropdownTitle.set('noCaret', false);
      }, 550);
    }

    var dropdownTitle = component({
      data: data,
      select: function(index) {
        var titles = this.get('titles');
        $.each(titles, function(i) {
          this.selected = i === index;

          if (i === index) {
            titles[i].select();
          }
        });

        this.set('titles', titles);

        this.set('selected.index', index);
        this.set('selected.name', data.titles[index].name);
        this.set('noAnimation', true);

        setTimeout(function() {
          _close();
        });
      },

      toggle: function() {
        if (data.titles.length < 2) {
          return;
        }

        if (this.get('opened')) {
          _close();
        }
        else {
          this.fire('open', {
            height: $(el).find('.dropdown-title h2').height() * (data.titles.length + 1)
          });
          this.set('opened', true);
        }
      }
    });

    done();
  });

})();
