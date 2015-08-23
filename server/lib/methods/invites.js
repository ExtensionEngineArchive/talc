
Meteor.methods({
  // TODO: Validation, resend
  'invites.send': function(email) {
    var existingUser = Meteor.users.findOne({ email: email });
    if (!existingUser) {
      var userId = Accounts.createUser({ email: email, password: Random.hexString(10) });
      Accounts.sendEnrollmentEmail(userId);
      return userId;
    } else {
      return existingUser._id;
    }
  }
});
