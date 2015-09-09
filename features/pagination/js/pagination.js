(function() {
  'use strict';

  window.Ractive.controller('pagination', function(component, data, el, config, done) {

    var pagination = null,
        refs = {
          totalPages: 'total-pages',
          pageSelected: 'page-selected',
          displayPagesCount: 'display-pages-count',
          displayFirstButton: 'display-first-button',
          displayLastButton: 'display-last-button',
          displayPreviousButton: 'display-previous-button',
          displayNextButton: 'display-next-button'
        };

    $.each(refs, function(key, value) {
      data[key] = data[value] && data[value] == 'false' ? false : true;
    });

    data.totalPages = data['total-pages'] ? parseInt(data['total-pages'], 10) : 20;
    data.pageSelected = data['page-selected'] ? parseInt(data['page-selected'], 10) : 1;
    data.displayPagesCount = data['display-pages-count'] ? parseInt(data['display-pages-count'], 10) : 7;

    function _updatePages() {
      var pages = [],
          totalPages = parseInt(pagination.get('totalPages'), 10),
          pageSelected = parseInt(pagination.get('pageSelected'), 10),
          displayPagesCount = parseInt(pagination.get('displayPagesCount'), 10),
          selectIndex = Math.round(displayPagesCount / 2) - 1,
          start = Math.max(1, pageSelected - selectIndex),
          stop = Math.min(totalPages + 1, start + displayPagesCount);

      if (stop - start < displayPagesCount && start > 1) {
        start = Math.max(1, start - (displayPagesCount - (stop - start)));
      }

      for (var i = start; i < stop; i++) {
        pages.push(i.toString());
      }

      pagination.set('pages', pages);
    }

    pagination = component({
      data: data
    });

    $.each(refs, function(key, value) {
      pagination.observe(value, function(newValue) {
        newValue = typeof newValue == 'undefined' ? true : newValue;

        pagination.set(key,
          newValue == 'false' ? false : (
          newValue == 'true' ? true : newValue
        ));
      });
    });

    pagination.observe('pageSelected', function(newValue) {
      var value = Math.max(1, Math.min(parseInt(pagination.get('totalPages'), 10), newValue)).toString();
      if (value !== newValue) {
        setTimeout(function() {
          pagination.set('pageSelected', value);
        });

        return false;
      }

      var onpagselected = pagination.get('onpagselected');
      if (onpagselected) {
        onpagselected(parseInt(value, 10));
      }

      _updatePages();
    });

    pagination.observe('totalPages displayPagesCount', function() {
      _updatePages();
    });

    _updatePages();

    pagination.on('selectPage', function (event) {
      pagination.set('pageSelected', event.context);
    });

    pagination.on('previousPage', function() {
      pagination.set('pageSelected', parseInt(pagination.get('pageSelected'), 10) - 1);
    });

    pagination.on('nextPage', function() {
      pagination.set('pageSelected', parseInt(pagination.get('pageSelected'), 10) + 1);
    });

    pagination.on('firstPage', function() {
      pagination.set('pageSelected', '1');
    });

    pagination.on('lastPage', function() {
      pagination.set('pageSelected', pagination.get('totalPages'));
    });

     done();
  });
})();
