
var activity;

Dependency.autorun(function() {
  activity = Dependency.get('activityService');
});

Template.activeUsersComponent.onRendered(function() {
  $('.active-users-component ul').on('DOMNodeInserted', function() {
    $(this).find('[data-toggle="tooltip"]').tooltip();
  });
});

Template.activeUsersComponent.helpers({
  users: function() {
    return activity.users();
  },
  initials: function(user) {
    return user.profile.firstName[0];
  }
});
