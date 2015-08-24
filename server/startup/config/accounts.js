
Meteor.startup(function() {
  Accounts.emailTemplates.from = 'TALC <' + Meteor.settings.private.email.address + '>';
});
