
Template.navbarComponent.helpers({
  user: function() {
    if (Meteor.user()) {
      return {
        _id: Meteor.user()._id,
        firstName: Meteor.user().profile.firstName,
        lastName: Meteor.user().profile.lastName,
        email: Meteor.user().emails[0].address
      };
    }
  },
  onDashboard: function() {
    return Router.current().route.getName() === 'dashboard';
  },
  showActiveUsers: function() {
    var route = Router.current().route.getName();
    return (route === 'graph.editor') || (route === 'graph.settings');
  }
});

Template.navbarComponent.events({
  'click #logout': function() {
    Meteor.logout();
  }
});
