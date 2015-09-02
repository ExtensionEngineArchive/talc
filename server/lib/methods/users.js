
Meteor.methods({
  'users.profile.update': function(params) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var user = Meteor.users.findOne({ _id: Meteor.userId() });

    params.firstName = params.firstName || user.profile.firstName;
    params.lastName = params.lastName || user.profile.lastName;

    Meteor.users.update({ _id: user._id }, {
      $set: {
        "profile.firstName": params.firstName,
        "profile.lastName": params.lastName
      }
    });
  }
});
