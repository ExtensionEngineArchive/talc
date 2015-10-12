
var ERRORS_KEY = 'resetPasswordErrors';

Template.resetPassword.onCreated(function() {
  Session.set(ERRORS_KEY, {});
  this.storage = {
    tokenSent: new ReactiveVar(false)
  };
});

Template.resetPassword.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'has-error';
  },
  tokenSent: function() {
    return Template.instance().storage.tokenSent.get();
  },
  resetToken: function() {
    return Template.currentData().token;
  }
});

Template.resetPassword.events({
  'submit #resetPasswordRequest': function(e, t) {
    e.preventDefault();

    var email = t.$('[name=email]').val();

    if (!TALCH.validate.email(email).isValid()) {
      Session.set(ERRORS_KEY, { 'email': 'Invalid email address' });
    } else {
      t.storage.tokenSent.set(true);
      Accounts.forgotPassword({ email: email }, function(error) {
        if (error) {
          console.error(error);
        }
      });
    }

    return false;
  },
  'submit #resetPassword': function(e, t) {
    e.preventDefault();

    var password = t.$('[name=password]').val();
    var passwordConfirmation = t.$('[name=passwordConfirmation]').val();
    var token = Template.currentData().token;

    var validationResult = TALCH.validate.password(password);
    if (validationResult.isValid()) {
      Session.set(ERRORS_KEY, { 'password': validationResult.message });
      return false;
    }

    if (password !== passwordConfirmation) {
      Session.set(ERRORS_KEY, { 'none': 'Passwords do not match' });
      return false;
    }

    Accounts.resetPassword(token, password, function(error) {
      if (error) {
        Session.set(ERRORS_KEY, { 'none': error.message });
        return false;
      } else {
        Router.go('/');
      }
    });
  }
});
