(function() {
  'use strict';

  window.Ractive.controller('pl-button-onoff', function(component, data, el, config, done) {

    data.label = typeof data['text-label'] == 'undefined' ? 'on/off' : data['text-label'];

    var buttonOnoff = component({
      plName: 'pl-button-onoff',
      data: $.extend(true, {
        on: false
      }, data),

      toggleOn: function() {
        this.set('on', true);
      },
      toggleOff: function() {
        this.set('on', false);
      },
      toggle: function() {
        this.set('on', !this.get('on'));
      },
      isOn: function() {
        return this.get('on');
      }
    });

    buttonOnoff.on('toggle', function() {
      buttonOnoff.toggle();
    });

    if (data.toggle) {
      buttonOnoff.on('toggle', function(event) {
        data.toggle(event, buttonOnoff.isOn());
      });
    }

    done();
  });

})();
