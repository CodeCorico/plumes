(function() {
  'use strict';

  window.Ractive.controller('pl-login', function(component, data, el, config, done) {

    data.avatar = !data.avatar ? 'null' : data.avatar;

    var Login = component({
          plName: 'pl-login',
          data: $.extend(true, {
            show: false,
            top: 0,
            inForgot: false,
            texts: {
              username: 'Name',
              code: 'Code',
              userpassword: 'Password',
              userpasswordconfirm: 'Confirm password',
              forgotlink: 'I forgot my password',
              login: 'Back to login',
              forgottext: 'Submit your email and press <span class="key">ENTER</span> to receive a validation code in your mailbox.',
              forgotcodetext: 'Use your <strong>validation code</strong> and press <span class="key">ENTER</span> to get the possibility to change your password.',
              forgotpasswordtext: 'Enter your new password twice (to confirm) and press <span class="key">ENTER</span> to change your password.',
              forgotpasswordhelp: [
                'When creating your password, remember the following:',
                '<ol>',
                  '<li>It must not contain your name.</li>',
                  '<li>It must contain one or more digits.</li>',
                  '<li>It is recommended to mix lowercase and uppercase characters.</li>',
                  '<li>It should be long over 7 characters.</li>',
                '</ol>'
              ].join('')
            }
          }, data)
        }),
        _$el = {
          window: $(window),
          login: $(Login.el),
          forgotTexts: $(Login.el).find('.pl-login-forgot-texts')
        };

    window.Ractive.Plumes.bindUses(Login, ['forgot']);

    window.Ractive.Plumes.bindTexts(Login);

    Login.observe('texts.username', function(value) {
      Login.set('texts.usernamePlaceholder', value);
    });

    Login.observe('texts.userpassword', function(value) {
      Login.set('texts.userpasswordPlaceholder', value);
    });

    function _refresh() {
      var messageHeight = _$el.message.outerHeight(true);

      Login.set('height', _$el.window.height() - (40 + messageHeight + 30));

      if (_$el.forgotTexts.length) {
        Login.set('helpTop', _$el.forgototTexts.position().top);
      }
    }

    function _focusName() {
      _$el.login.find('.name').focus();
    }

    function _modal(message, type, clearUsername, clearUserpassword, callback) {
      Login.set('inModal', true);
      Login.set('message', message);
      Login.set('messageType', type);
      Login.set('storyboardMessage', 'sb-message-1');

      setTimeout(function() {
        if (clearUsername) {
          Login.set('username', '');
        }
        if (clearUserpassword) {
          Login.set('userpassword', '');
        }

        if (type == 'success') {
          Login.set('texts.usernamePlaceholder', Login.get('texts.username'));
          Login.set('texts.userpasswordPlaceholder', Login.get('texts.userpassword'));
        }

        Login.set('storyboardMessage', 'sb-message-2');
        setTimeout(function() {
          Login.set('storyboardMessage', 'sb-message-3');
          setTimeout(function() {
            Login.set('storyboardMessage', 'sb-message-4');
            setTimeout(function() {
              Login.set('storyboardError', null);
              Login.set('inModal', false);

              if (callback) {
                callback();
              }
            }, 350);
          }, 250);
        }, 3000);
      }, 250);
    }

    function _error(message, clearUsername, clearUserpassword, callback) {
      _modal(message, 'error', clearUsername, clearUserpassword, callback);
    }

    function _success(message, callback) {
      _modal(message, 'success', true, true, callback);
    }

    function _submit() {
      if (Login.get('inForgotPassword')) {
        Login.fire('forgotPassword', {
          password: Login.get('username'),
          confirmPassword: Login.get('userpassword')
        });
      }
      else if (Login.get('inForgotCode')) {
        Login.fire('forgotCode', {
          code: Login.get('username')
        });
      }
      else if (Login.get('inForgot')) {
        Login.fire('forgot', {
          username: Login.get('username')
        });
      }
      else {
        Login.fire('login', {
          username: Login.get('username'),
          userpassword: Login.get('userpassword')
        });
      }
    }

    _$el.login.find('.pl-login-form-content .input').keypress(function(event) {
      // enter
      if (event.which == 13) {
        _submit();

        event.preventDefault();
        event.stopPropagation();
      }
    });

    var lastObserveUsernameDate = new Date();

    Login.observe('username', function() {
      if (Login.get('inForgotCode') || Login.get('inForgotPassword')) {
        return;
      }

      lastObserveUsernameDate = new Date();

      var username = Login.get('username');

      setTimeout(function() {
        if (new Date().getTime() - lastObserveUsernameDate.getTime() >= 1000) {
          Login.fire('username', {
            username: username
          });
        }
      }, 1000);
    });

    Login.observe('avatar', function(value, oldValue) {
      if (oldValue == value) {
        return;
      }
      if (!value) {
        value = 'null';
        Login.set('avatar', value);
        if (oldValue == 'null') {
          return;
        }
      }

      Login.set('oldAvatar', oldValue);
      setTimeout(function() {
        Login.set('oldAvatar', null);
      }, 650);
    });

    Login.on('teardown', function() {
      Login = null;
      _$el.window.off('resize', _resize);
    });

    function _close() {
      Login.fire('closed');

      if (Login && !Login.shouldDestroy) {
        Login.teardown();
      }
    }

    Login.on('logged', function(text) {
      var ScreenMessage = Login.findChild('name', 'pl-screen-message');
      ScreenMessage.fire('closeTitle');

      Login.set('storyboard', 'sb-hide-1');

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

    Login.on('close', _close);

    Login.on('error', function(args) {
      args = $.extend(true, {
        message: 'You have an error in your credentials.',
        clearUsername: false,
        clearUserpassword: true
      }, args || {});

      _error(args.message, args.clearUsername, args.clearUserpassword, _focusName);
    });

    Login.on('displayForgot', function() {
      _refresh();
      Login.set('inForgot', true);
      Login.fire('enterForgot');

      setTimeout(_focusName);
    });

    Login.on('openHelp', function() {
      Login.set('inHelp', true);
      setTimeout(_focusName);
    });

    Login.on('displayLogin', function() {
      var inForgot = Login.get('inForgot'),
          inForgotCode = Login.get('inForgotCode'),
          inForgotPassword = Login.get('inForgotPassword');

      if (inForgotCode || inForgotPassword) {
        Login.set('username', '');
        Login.set('userpassword', '');
      }

      Login.set('inHelp', false);
      Login.set('inForgot', false);
      Login.set('inForgotCode', false);
      Login.set('inForgotPassword', false);
      Login.set('texts.usernamePlaceholder', Login.get('texts.username'));
      Login.set('texts.userpasswordPlaceholder', Login.get('texts.userpassword'));

      if (inForgotCode) {
        Login.fire('exitForgotCode');
      }

      if (inForgotPassword) {
        Login.fire('exitForgotPassword');
      }

      if (inForgot) {
        Login.fire('exitForgot');
      }

      setTimeout(_focusName);
    });

    Login.on('forgotSuccess', function() {
      Login.set('inForgotCode', true);
      Login.set('username', '');
      Login.set('texts.usernamePlaceholder', Login.get('texts.code'));

      Login.fire('enterForgotCode');

      setTimeout(_focusName);
    });

    Login.on('forgotError', function(args) {
      args = $.extend(true, {
        message: 'This email address doesn\'t exist.',
        clearUsername: false,
        clearUserpassword: false
      }, args || {});

      _error(args.message, args.clearUsername, args.clearUserpassword, _focusName);
    });

    Login.on('forgotCodeSuccess', function() {
      Login.set('inForgotCode', false);
      Login.set('inForgotPassword', true);
      Login.set('username', '');
      Login.set('texts.usernamePlaceholder', Login.get('texts.userpassword'));
      Login.set('userpassword', '');
      Login.set('texts.userpasswordPlaceholder', Login.get('texts.userpasswordconfirm'));

      Login.fire('enterForgotPassword');

      setTimeout(_focusName);
    });

    Login.on('forgotCodeError', function(args) {
      args = $.extend(true, {
        message: 'Code invalid.',
        clearUsername: true,
        clearUserpassword: false
      }, args || {});

      _error(args.message, args.clearUsername, args.clearUserpassword, _focusName);
    });

    Login.on('forgotPasswordSuccess', function(args) {
      args = $.extend(true, {
        message: 'New password registered.'
      }, args || {});

      _success(args.message, function() {
        Login.fire('displayLogin');
      });
    });

    Login.on('forgotPasswordError', function(args) {
      args = $.extend(true, {
        message: 'Passwords are invalid.',
        clearUsername: true,
        clearUserpassword: true
      }, args || {});

      _error(args.message, args.clearUsername, args.clearUserpassword, _focusName);
    });

    function _resize() {
      if (!Login) {
        return;
      }

      var storyboard = Login.get('storyboard');

      if (storyboard == 'sb-show-2' || storyboard == 'sb-show-3' || storyboard == 'sb-show-4') {
        _refresh();
      }
    }

    _$el.window.resize(_resize);

    Login.require().then(function() {
      var ScreenMessage = Login.findChild('name', 'pl-screen-message'),
          textQuestion = Login.get('texts.question');

      textQuestion = !textQuestion && textQuestion !== '' ? 'Who are you?' : textQuestion;

      ScreenMessage.fire('play', {
        message: textQuestion,
        lastLineToTitle: true,
        displayTextTime: 350,
        done: function() {
          _$el.message = $(ScreenMessage.el).find('.pl-screen-messages-message');

          var messageHeight = _$el.message.outerHeight(true);

          Login.set('top', _$el.message.offset().top + messageHeight - 1);
          Login.set('height', 1);
          Login.set('storyboard', 'sb-show-1');

          setTimeout(function() {
            Login.set('storyboard', 'sb-show-2');
            Login.set('top', 40 + messageHeight);
            _refresh();

            setTimeout(function() {
              Login.set('storyboard', 'sb-show-3');

              setTimeout(function() {
                _$el.login.find(!data.username ? '.name' : '.password').focus();
                Login.set('storyboard', 'sb-show-4');
              }, 450);

            }, 450);
          }, 650);
        }
      });

      done();
    });

  });

})();
