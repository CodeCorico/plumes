(function() {
  'use strict';

  window.Ractive.controller('screen-message', function(component, data, el, config, done) {

    var DISPLAY_TEXT_TIME = 3000,
        DISPLAY_WORD_TIME = 150,

        _$el = {
          window: $(window)
        },
        _playArgs = null;

    var ScreenMessage = component({
      data: data
    });

    _$el.el = $(ScreenMessage.el);
    _$el.message = _$el.el.find('.message');

    function _play(playArgs) {
      if (playArgs && playArgs != _play) {
        ScreenMessage.set('play', null);

        _playArgs = playArgs;
        ScreenMessage.set('playing', true);
        ScreenMessage.set('playingDone', false);

        setTimeout(function() {
          _playMessage(playArgs.message);
        }, 550);
      }
    }

    function _hideMessage(index, callback) {
      if (index === 0) {
        callback();

        return;
      }

      var words = ScreenMessage.get('words');

      words.forEach(function(word, i) {
        ScreenMessage.set('words[' + i + '].out', true);
      });

      setTimeout(function() {
        callback();
      }, 350);
    }

    function _displayMessage(message, index, callback) {
      _hideMessage(index, function() {

        if (message.length == index) {
          if (callback) {
            callback();
          }

          return;
        }

        var words = message[index].split(' ').map(function(word) {
          return {
            word: word,
            display: false,
            out: false
          };
        });

        ScreenMessage.set('words', words);

        ScreenMessage.set('messageTop', (_$el.window.height() - _$el.message.outerHeight()) / 2);

        setTimeout(function() {
          words.forEach(function(word, i) {

            setTimeout(function() {
              ScreenMessage.set('words[' + i + '].display', true);
            }, DISPLAY_WORD_TIME * i);

          });

          setTimeout(function() {

            index++;

            setTimeout(function() {
              _displayMessage(message, index, callback);
            }, DISPLAY_TEXT_TIME);

          }, DISPLAY_WORD_TIME * words.length + 350);

        });

      });
    }

    function _playMessage(message) {
      message = typeof message == 'string' ? [message] : message;

      _displayMessage(message, 0, _done);
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

    done();
  });

})();
