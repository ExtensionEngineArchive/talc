
Template.navbarComponent.helpers({
  user: function() {
    if (Meteor.user()) {
      return {
        firstName: Meteor.user().profile.firstName,
        lastName: Meteor.user().profile.lastName,
        email: Meteor.user().emails[0].address
      }
    }
  }
});

Template.navbarComponent.events({
  'click #logout': function() {
    Meteor.logout();
  }
});
