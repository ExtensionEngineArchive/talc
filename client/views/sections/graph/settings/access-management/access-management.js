
Template.geAccessManagement.helpers({
  members: function() {
    return TALCH.graph.users(this.graphRoot._id);
  }
});

Template.geAccessManagement.events({
  'click .addMember': function(e, t) {
    // Meteor.call('invites.send', email);
  }
});
