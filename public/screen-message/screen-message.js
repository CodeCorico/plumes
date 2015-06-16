(function() {
  'use strict';

  window.Ractive.controller('screen-message', function(component, data, el, config, done) {

    var _$el = {
          window: $(window)
        },
        _playArgs = null;

    var ScreenMessage = component({
      data: data
    });

    function _play(playArgs) {
      if (playArgs && playArgs != _playArgs) {
        ScreenMessage.set('play', null);

        _playArgs = playArgs;
        ScreenMessage.set('playing', true);
        ScreenMessage.set('playingDone', false);

        setTimeout(function() {
          ScreenMessage.childrenRequire[0].set('play', {
            message: playArgs.message,
            callback: _done,
            lineCallback: function(Message) {
              ScreenMessage.set('messageTop', (_$el.window.height() - $(Message.el).outerHeight()) / 2);
            }
          });
        }, 550);
      }
    }

    function _done() {
      ScreenMessage.set('playingDone', true);

      setTimeout(function() {
        ScreenMessage.set('playing', false);
        ScreenMessage.set('playingDone', false);

        if (_playArgs.done) {
          _playArgs.done();
        }

        _playArgs = null;
      }, 350);
    }

    ScreenMessage.observe('play', function(playArgs) {
      setTimeout(function() {
        _play(playArgs);
      });
    });

    ScreenMessage.require().then(done);
  });

})();
