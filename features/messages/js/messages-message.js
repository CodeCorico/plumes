(function() {
  'use strict';

  window.Ractive.controller('messages-message', function(component, data, el, config, done) {

    var DISPLAY_TEXT_TIME = 3000,
        DISPLAY_WORD_TIME = 150;

    var Message = component({
      data: data
    });

    function _hideMessage(index, callback) {
      if (index === 0) {
        callback();

        return;
      }

      var words = Message.get('words');

      words.forEach(function(word, i) {
        Message.set('words[' + i + '].out', true);
      });

      setTimeout(function() {
        callback();
      }, 350);
    }

    function _displayMessage(message, index, callback, lineCallback) {
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

        Message.set('words', words);

        if (lineCallback) {
          lineCallback(Message);
        }

        // Message.set('messageTop', (_$el.window.height() - _$el.message.outerHeight()) / 2);

        setTimeout(function() {
          words.forEach(function(word, i) {

            setTimeout(function() {
              Message.set('words[' + i + '].display', true);
            }, DISPLAY_WORD_TIME * i);

          });

          setTimeout(function() {

            index++;

            setTimeout(function() {
              _displayMessage(message, index, callback, lineCallback);
            }, DISPLAY_TEXT_TIME);

          }, DISPLAY_WORD_TIME * words.length + 350);

        });

      });
    }

    Message.observe('play', function(args) {
      args = args || {};
      if (!args.message) {
        return;
      }

      args.message = typeof message == 'string' ? [args.message] : args.message;

      setTimeout(function() {

        _displayMessage(args.message, 0, args.callback || null, args.lineCallback || null);
      });
    });

    done();
  });

})();
