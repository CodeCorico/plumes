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
        ScreenMessage.set('messageTitle', false);

        setTimeout(function() {
          ScreenMessage.childrenRequire[0].set('play', {
            message: playArgs.message,
            callback: _done,
            lineCallback: function(Message) {
              ScreenMessage.set('messageTop', (_$el.window.height() - $(Message.el).outerHeight()) / 2);

              if (_playArgs.lineCallback) {
                _playArgs.lineCallback(Message);
              }
            },
            displayedLineCallback: _playArgs.displayedLineCallback || null,
            displayTextTime: _playArgs.displayTextTime ||  null,
            displayWordTime: _playArgs.displayWordTime || null,
            freezeLastLine: _playArgs.freezeLastLine || _playArgs.lastLineToTitle || null
          });
        }, 550);
      }
    }

    function _done() {
      if (_playArgs.freezeLastLine) {
        if (_playArgs.done) {
          _playArgs.done();
        }

        return;
      }
      else if (_playArgs.lastLineToTitle) {
        ScreenMessage.set('messageTitle', true);
        ScreenMessage.set('messageTop', 100);

        return;
      }

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
