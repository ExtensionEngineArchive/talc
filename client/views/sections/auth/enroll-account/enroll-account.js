
var ERRORS_KEY = 'enrollAccountErrors';

Template.enrollAccount.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.enrollAccount.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'has-error';
  }
});

Template.enrollAccount.events({
  'submit': function(e, t) {
    e.preventDefault();

    var password = t.$('[name=password]').val();
    var confirmPassword = t.$('[name=confirmPassword]').val();

    var errors = {};

    if (!password) {
      errors.password = 'Password is required';
    }

    if (password != confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Password confirmation is required';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    Accounts.resetPassword(this.token, password, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, { 'none': error.reason });
      } else {
        Router.go('/');
      }
    });
  }
});
