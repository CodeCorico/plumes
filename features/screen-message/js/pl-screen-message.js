(function() {
  'use strict';

  window.Ractive.controller('pl-screen-message', function(component, data, el, config, done) {

    var ScreenMessage = component({
          plName: 'pl-screen-message',
          data: data
        }),
        _$el = {
          window: $(window)
        },
        _playArgs = null;

    function _play(playArgs) {
      if (playArgs && playArgs != _playArgs) {
        var Message = ScreenMessage.findChild('name', 'pl-messages-message');

        Message.fire('reset');

        _playArgs = playArgs;

        setTimeout(function() {
          ScreenMessage.set('playing', true);
          ScreenMessage.set('playingDone', false);
          ScreenMessage.set('storyboard', '');

          setTimeout(function() {
            Message.fire('play', {
              message: playArgs.message,
              callback: _done,
              lineCallback: function() {
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
        });
      }
    }

    function _done() {
      if (_playArgs.freezeLastLine) {
        if (_playArgs.done) {
          _playArgs.done();
        }
        _playArgs = null;

        return;
      }
      else if (_playArgs.lastLineToTitle) {
        ScreenMessage.set('storyboard', 'sb-title-1');

        if (_playArgs.done) {
          _playArgs.done();
        }
        _playArgs = null;

        setTimeout(function() {
          ScreenMessage.set('storyboard', 'sb-title-2');
          ScreenMessage.set('messageTop', 40);
        }, 650);

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

    ScreenMessage.on('closeTitle', function(callback) {
      ScreenMessage.set('storyboard', 'sb-title-out-1');
      ScreenMessage.set('messageTop', 70);

      if (callback) {
        setTimeout(function() {
          ScreenMessage.set('storyboard', '');

          callback();
        }, 550);
      }
    });

    ScreenMessage.on('play', function(playArgs) {
      _play(playArgs);
    });

    ScreenMessage.require().then(done);
  });

})();
