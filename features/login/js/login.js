(function() {
  'use strict';

  window.Ractive.controller('login', function(component, data, el, config, done) {

    var Login = component({
      data: data
    });

    Login.require().then(function() {
      var ScreenMessage = Login.childrenRequire[0],
          textQuestion = Login.get('text-question');

      textQuestion = !textQuestion && textQuestion !== '' ? 'Who are you?' : textQuestion;

      ScreenMessage.set('play', {
        message: textQuestion,
        lastLineToTitle: true,
        displayTextTime: 1000,
        done: function() {
          console.log('DONE');
          // Login.fire('logged');
          // Login.teardown();
        }
      });

      done();
    });

  });

})();
