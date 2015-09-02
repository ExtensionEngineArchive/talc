
// TODO: Transactions
Meteor.methods({
  'invites.graph': function(email, graphId, role) {
    if (!Meteor.userId() || !TALCH.user.isGraphAdmin(Meteor.user(), graphId)) {
      throw new Meteor.Error("not-authorized");
    }

    if (!TALCH.graph.isValidRole(role)) {
      throw new Meteor.Error("Invalid role");
    }

    var user = Meteor.users.findOne({ emails: { $elemMatch: { address: email } } });
    if (!user) {
      user = createUser(email);
    }

    Roles.addUsersToRoles(user._id, [role], graphId);
  }
});

function createUser(email) {
  var _id = Accounts.createUser({
    email: email,
    password: Random.hexString(10),
    profile: {}
  });

  var user = Meteor.users.findOne({ _id: _id });

  Meteor.setTimeout(function () {
    Accounts.sendEnrollmentEmail(_id);
  });

  return user;
}
