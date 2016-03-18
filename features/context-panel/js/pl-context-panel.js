(function() {
  'use strict';

  window.Ractive.controller('pl-context-panel', function(component, data, el, config, done) {

    var _$el = {},
        contextPanel = component({
          plName: 'pl-context-panel',
          data: data,
          open: function() {
            contextPanel.set('panelOpened', true);

            _$el.plPanelSections.each(function(i) {
              var section = $(this);

              setTimeout(function() {
                section.addClass('pl-opened');
              }, i * 150);
            });
          },
          close: function() {
            contextPanel.set('panelOpened', false);

            _$el.plPanelSections.each(function() {
              $(this).removeClass('pl-opened');
            });
          }
        });

    contextPanel.require().then(function() {
      _$el.plPanelSections = $($(contextPanel.el).find('.pl-section'));
      done();
    });

  });
})();
