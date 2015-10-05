(function() {
  'use strict';

  window.Ractive.controller('pl-screen-message', function(component, data, el, config, done) {

    var screenMessage = component({
          plName: 'pl-screen-message',
          data: data
        }),
        _$el = {
          window: $(window)
        },
        _playArgs = null;

    function _play(playArgs) {
      if (playArgs && playArgs != _playArgs) {
        var Message = screenMessage.childrenRequire[0];

        Message.fire('reset');

        _playArgs = playArgs;
        screenMessage.set('playing', true);
        screenMessage.set('playingDone', false);
        screenMessage.set('storyboard', false);

        setTimeout(function() {
          Message.fire('play', {
            message: playArgs.message,
            callback: _done,
            lineCallback: function() {
              screenMessage.set('messageTop', (_$el.window.height() - $(Message.el).outerHeight()) / 2);

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
        _playArgs = null;

        return;
      }
      else if (_playArgs.lastLineToTitle) {
        screenMessage.set('storyboard', 'sb-title-1');

        if (_playArgs.done) {
          _playArgs.done();
        }
        _playArgs = null;

        setTimeout(function() {
          screenMessage.set('storyboard', 'sb-title-2');
          screenMessage.set('messageTop', 100);
        }, 650);

        return;
      }

      screenMessage.set('playingDone', true);

      setTimeout(function() {
        screenMessage.set('playing', false);
        screenMessage.set('playingDone', false);

        if (_playArgs.done) {
          _playArgs.done();
        }

        _playArgs = null;
      }, 350);
    }

    screenMessage.on('closeTitle', function(callback) {
      screenMessage.set('storyboard', 'sb-title-out-1');
      screenMessage.set('messageTop', 70);

      if (callback) {
        setTimeout(function() {
          screenMessage.set('storyboard', '');

          callback();
        }, 550);
      }
    });

    screenMessage.on('play', function(playArgs) {
      _play(playArgs);
    });

    screenMessage.require().then(done);
  });

})();
