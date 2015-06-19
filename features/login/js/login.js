(function() {
  'use strict';

  window.Ractive.controller('login', function(component, data, el, config, done) {

    var _$el = {
          window: $(window)
        };

    data.texts = {};

    $.each(data, function(name, value) {
      if (name.substr(0, 5) == 'text-') {
        name = name.substr(5, name.length - 5);
        data.texts[name] = value;
      }
    });

    data.avatar = typeof data.avatar == 'undefined' ? '/public/login/avatar.png' : data.avatar;
    data.texts.username = typeof data.texts.username == 'undefined' ? 'Name' : data.texts.username;
    data.texts.userpassword = typeof data.texts.userpassword == 'undefined' ? 'Password' : data.texts.userpassword;

    function _refresh() {
      var messageHeight = _$el.message.outerHeight(true);

      Login.set('height', _$el.window.height() - (100 + messageHeight + 30));
    }

    var Login = component({
      data: $.extend(true, {
        show: false,
        top: 0
      }, data)
    });

    Login.on('passwordFocus', function() {
      Login.fire('usernameChanged', Login.get('username'));
    });

    Login.observe('avatar', function(value, oldValue) {
      if (oldValue == value) {
        return;
      }

      Login.set('oldAvatar', oldValue);
      setTimeout(function() {
        Login.set('oldAvatar', null);
      }, 650);
    });

    function _close() {
      Login.fire('closed');
      Login.teardown();
    }

    Login.on('logged', function(text) {
      var ScreenMessage = Login.childrenRequire[0];
      ScreenMessage.fire('closeTitle');

      Login.set('storyboard', 'sb-hide-1');

      Login.set('top', 0);
      Login.set('height', _$el.window.height());

      setTimeout(function() {
        Login.set('storyboard', 'sb-hide-2');

        setTimeout(function() {
          Login.set('storyboard', 'sb-hide-3');

          setTimeout(function() {

            if (text) {
              ScreenMessage.fire('play', {
                message: text,
                done: function() {
                  _close();
                }
              });
            }
            else {
              _close();
            }
          }, 150);
        }, 400);
      }, 350);
    });

    Login.on('close', function() {
      Login.fire('closed');
      Login.teardown();
    });

    Login.on('submit', function(event) {
      Login.fire('login', {
        username: Login.get('username'),
        userpassword: Login.get('userpassword')
      });

      event.original.preventDefault();
    });

    Login.on('error', function(args) {
      args = $.extend(true, {
        message: 'You have an error in your credentials.',
        clearUsername: false,
        clearUserpassword: true
      }, args || {});

      Login.set('error', args.message);
      Login.set('storyboardError', 'sb-error-1');

      setTimeout(function() {
        if (args.clearUsername) {
          Login.set('username', '');
        }
        if (args.clearUserpassword) {
          Login.set('userpassword', '');
        }

        Login.set('storyboardError', 'sb-error-2');
        setTimeout(function() {
          Login.set('storyboardError', 'sb-error-3');
          setTimeout(function() {
            Login.set('storyboardError', 'sb-error-4');
            setTimeout(function() {
              Login.set('storyboardError', null);
            }, 350);
          }, 250);
        }, 3000);
      }, 250);
    });

    _$el.window.resize(function() {
      if (!Login) {
        return;
      }

      var storyboard = Login.get('storyboard');

      if (storyboard == 'sb-show-2' || storyboard == 'sb-show-3') {
        _refresh();
      }
    });

    Login.require().then(function() {
      var ScreenMessage = Login.childrenRequire[0],
          textQuestion = Login.get('texts.question');

      textQuestion = !textQuestion && textQuestion !== '' ? 'Who are you?' : textQuestion;

      ScreenMessage.fire('play', {
        message: textQuestion,
        lastLineToTitle: true,
        displayTextTime: 350,
        done: function() {
          _$el.message = $(ScreenMessage.el).find('.screen-message-message');

          var messageHeight = _$el.message.outerHeight(true);

          Login.set('top', _$el.message.offset().top + messageHeight - 1);
          Login.set('height', 1);
          Login.set('storyboard', 'sb-show-1');

          setTimeout(function() {
            Login.set('storyboard', 'sb-show-2');
            Login.set('top', 100 + messageHeight);
            _refresh();

            setTimeout(function() {
              Login.set('storyboard', 'sb-show-3');

              setTimeout(function() {
                $(Login.el).find(!data.username ? '.name' : '.password').focus();
              }, 450);

            }, 450);
          }, 650);
        }
      });

      done();
    });

  });

})();
