
Meteor.startup(function() {
  var smtp = {
    username: Meteor.settings.private.email.username,
    password: Meteor.settings.private.email.password,
    server: Meteor.settings.private.email.server,
    port: Meteor.settings.private.email.port
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
