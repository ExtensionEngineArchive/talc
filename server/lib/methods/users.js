
Meteor.methods({
  'users.profile.update': function(params) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var user = Meteor.users.findOne({ _id: Meteor.userId() });

    params.firstName = params.firstName || user.profile.firstName;
    params.lastName = params.lastName || user.profile.lastName;
    params.photo = params.photo || user.profile.photo;

    Meteor.users.update({ _id: user._id }, {
      $set: {
        "profile.firstName": params.firstName,
        "profile.lastName": params.lastName,
        "profile.photo": params.photo
      }
    });
  },
  'users.role.set': function(userId, role) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var user = Meteor.user();
    if (!TALCH.user.isAdmin(user)) {
      throw new Meteor.Error("not-authorized");
    }

    var roles = role ? [role] : [];
    Roles.setUserRoles(userId, roles, 'global');
  }
});
