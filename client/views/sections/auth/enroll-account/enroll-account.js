
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
    var passwordConfirmation = t.$('[name=confirmPassword]').val();

    var profile = {
      firstName: t.$('[name=firstName]').val(),
      lastName: t.$('[name=lastName]').val()
    };

    var errors = {};

    if (profile.firstName.length < 2) {
      errors.firstName = 'First name is too short';
    }

    if (profile.lastName.length < 2) {
      errors.lastName = 'Last name is too short';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    var validationResult = TALCH.validate.password(password);
    if (!validationResult.isValid()) {
      errors.password = validationResult.message;
    }

    if (!passwordConfirmation) {
      errors.confirmPassword = 'Password confirmation is required';
    }

    if (password !== passwordConfirmation) {
      errors.none = 'Passwords do not match';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    Accounts.resetPassword(this.token, password, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, { 'none': error.reason });
      } else {
        Meteor.call('users.profile.update', profile, function() {
          Router.go('/');
        });
      }
    });
  }
});
