(function() {
  'use strict';

  window.Ractive.controller('pl-messages-message', function(component, data, el, config, done) {

    var DISPLAY_TEXT_TIME = 3000,
        DISPLAY_WORD_TIME = 150,

        Message = component({
          plName: 'pl-messages-message',
          data: data
        }),
        _message = null;

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

    function _displayMessage(message, index, args) {
      _hideMessage(index, function() {

        if (message.length == index) {
          if (args.callback) {
            args.callback();
          }

          return;
        }

        var words = (message[index].match(/<(\w+)[^>]*>.*?<\/\1>\.?|\S+/g) || ['']).map(function(word) {
          return {
            word: word,
            display: false,
            out: false
          };
        });

        Message.set('words', words);

        if (args.lineCallback) {
          args.lineCallback(Message);
        }

        setTimeout(function() {
          words.forEach(function(word, i) {

            setTimeout(function() {
              Message.set('words[' + i + '].display', true);
            }, args.displayWordTime * i);

          });

          setTimeout(function() {

            if (args.displayedLineCallback) {
              args.displayedLineCallback(Message);
            }

            index++;

            setTimeout(function() {
              if (message.length == index && args.freezeLastLine) {
                if (args.callback) {
                  args.callback();
                }
              }
              else {
                _displayMessage(message, index, args);
              }
            }, args.displayTextTime);

          }, (args.displayWordTime * words.length) + 350);

        });

      });
    }

    Message.on('reset', function() {
      _message = null;
      Message.set('words', null);
    });

    Message.on('play', function(args) {
      args = args || {};
      if (!args.message) {
        return;
      }

      args.message = typeof args.message == 'string' ? [args.message] : args.message;

      setTimeout(function() {

        args = $.extend(true, {
          callback: null,
          lineCallback: null,
          displayedLineCallback: null,
          displayTextTime: DISPLAY_TEXT_TIME,
          displayWordTime: DISPLAY_WORD_TIME,
          freezeLastLine: false
        }, args);

        args.displayTextTime = !args.displayTextTime && args.displayTextTime !== 0 ? DISPLAY_TEXT_TIME : args.displayTextTime;
        args.displayWordTime = !args.displayWordTime && args.displayWordTime !== 0 ? DISPLAY_WORD_TIME : args.displayWordTime;

        _message = args.message;

        _displayMessage(args.message, 0, args);
      });
    });

    Message.on('hideMessage', function(callback) {
      if (!_message || !_message.length) {
        if (callback) {
          callback();
        }

        return;
      }

      _hideMessage(_message.length - 1, function() {
        if (callback) {
          callback();
        }
      });
    });

    done();
  });

})();
