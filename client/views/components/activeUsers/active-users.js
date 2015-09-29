
var activity;

Dependency.autorun(function() {
  activity = Dependency.get('activityService');
});

Template.activeUsersComponent.onRendered(function() {
  $('.active-users-component ul').on('DOMNodeInserted', function() {
    var that = this;
    setTimeout(function() {
      $(that).find('[data-toggle="tooltip"]').tooltip();
    }, 0);
  });
});

Template.activeUsersComponent.helpers({
  users: function() {
    return activity.users();
  },
  initials: function(user) {
    return user.profile.firstName[0];
  },
  photo: function() {
    return Files.findOne(this.profile.photo);
  }
});
