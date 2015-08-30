
Meteor.startup(function() {
  Accounts.emailTemplates.from = 'TALC <' + Meteor.settings.private.email.address + '>';

  Accounts.urls.enrollAccount = function(token) {
    return Meteor.absoluteUrl('enroll-account/' + token);
  };

  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };
});
