
var ERRORS_KEY = 'signInErrors';

Template.signIn.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.signIn.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'has-error';
  }
});

Template.signIn.events({
  'submit': function(e, t) {
    e.preventDefault();

    var email = t.$('[name=email]').val();
    var password = t.$('[name=password]').val();

    var errors = {};

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, { 'none': error.reason });
      }

      Router.go('/');
    });
  }
});
