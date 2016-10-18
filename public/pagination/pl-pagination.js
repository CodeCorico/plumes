(function() {
  'use strict';

  window.Ractive.controller('pl-pagination', function(component, data, el, config, done) {

    var refs = {
          totalPages: 'total-pages',
          pageSelected: 'page-selected',
          displayPagesCount: 'display-pages-count',
          displayFirstButton: 'display-first-button',
          displayLastButton: 'display-last-button',
          displayPreviousButton: 'display-previous-button',
          displayNextButton: 'display-next-button'
        },
        refsKeys = Object.keys(refs);

    refsKeys.forEach(function(key) {
      data[key] = data[refs[key]] && data[refs[key]] == 'false' ? false : true;
    });

    data.totalPages = data['total-pages'] ? parseInt(data['total-pages'], 10) : 20;
    data.pageSelected = data['page-selected'] ? parseInt(data['page-selected'], 10) : 1;
    data.displayPagesCount = data['display-pages-count'] ? parseInt(data['display-pages-count'], 10) : 7;

    var Pagination = component({
      plName: 'pl-pagination',
      data: data
    });

    function _updatePages() {
      var pages = [],
          totalPages = parseInt(Pagination.get('totalPages'), 10),
          pageSelected = parseInt(Pagination.get('pageSelected'), 10),
          displayPagesCount = parseInt(Pagination.get('displayPagesCount'), 10),
          selectIndex = Math.round(displayPagesCount / 2) - 1,
          start = Math.max(1, pageSelected - selectIndex),
          stop = Math.min(totalPages + 1, start + displayPagesCount);

      if (stop - start < displayPagesCount && start > 1) {
        start = Math.max(1, start - (displayPagesCount - (stop - start)));
      }

      for (var i = start; i < stop; i++) {
        pages.push(i.toString());
      }

      Pagination.set('pages', pages);
    }

    refsKeys.forEach(function(key) {
      Pagination.observe(refs[key], function(newValue) {
        newValue = typeof newValue == 'undefined' ? true : newValue;

        Pagination.set(key,
          newValue == 'false' ? false : (
          newValue == 'true' ? true : newValue
        ));
      });
    });

    Pagination.observe('pageSelected', function(newValue) {
      var value = Math.max(1, Math.min(parseInt(Pagination.get('totalPages'), 10), newValue)).toString();
      if (value !== newValue) {
        setTimeout(function() {
          Pagination.set('pageSelected', value);
        });

        return false;
      }

      var onpagselected = Pagination.get('onpagselected');
      if (onpagselected) {
        onpagselected(parseInt(value, 10));
      }

      _updatePages();
    });

    Pagination.observe('totalPages displayPagesCount', function() {
      _updatePages();
      Pagination.set('hasActionButtons', parseInt(data.totalPages, 10) > parseInt(data.displayPagesCount, 10));
    });

    _updatePages();

    Pagination.on('selectPage', function(event) {
      Pagination.set('pageSelected', event.context);
    });

    Pagination.on('previousPage', function() {
      Pagination.set('pageSelected', parseInt(Pagination.get('pageSelected'), 10) - 1);
    });

    Pagination.on('nextPage', function() {
      Pagination.set('pageSelected', parseInt(Pagination.get('pageSelected'), 10) + 1);
    });

    Pagination.on('firstPage', function() {
      Pagination.set('pageSelected', '1');
    });

    Pagination.on('lastPage', function() {
      Pagination.set('pageSelected', Pagination.get('totalPages'));
    });

    done();
  });
})();
