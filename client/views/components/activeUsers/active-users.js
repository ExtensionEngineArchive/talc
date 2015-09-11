
var activity;

Dependency.autorun(function() {
  activity = Dependency.get('activityService');
});

Template.activeUsersComponent.helpers({
  users: function() {
    return activity.users();
  },
  initials: function(user) {
    return user.profile.firstName[0];
  }
});
