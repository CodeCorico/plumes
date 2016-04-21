(function() {
  'use strict';

  window.Ractive.controller('index-content', function(component, data, el, config, done) {

    var Content = component({
      data: $.extend(true, {
        searchChange: function(event, value) {
          if (value == 'a') {
            Content.set('searchList', [{
              value: 'abbb',
              display: 'a<strong>bbb</strong>'
            }, {
              value: 'aa',
              display: 'a<strong>a</strong>'
            }, {
              value: 'aaaa',
              display: 'a<strong>aaa</strong>'
            }, {
              value: 'aabb',
              display: 'a<strong>abb</strong>'
            }, {
              value: 'accc',
              display: 'a<strong>ccc</strong>'
            }, {
              value: 'addd',
              display: 'a<strong>ddd</strong>'
            }]);
          }
          else if (value == 'aa') {
            Content.set('searchList', [{
              value: 'aaaa',
              display: 'a<strong>aaa</strong>'
            }, {
              value: 'aabb',
              display: 'a<strong>abb</strong>'
            }]);
          }
          else {
            Content.set('searchList', null);
          }
        },

        searchSelect: function(event, value) {
          console.log('Search Select:', value);
        }
      }, data)
    });

    Content.require().then(done);
  });

})();
