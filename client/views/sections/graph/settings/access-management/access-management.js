
Template.gsAccessManagement.helpers({
  members: function() {
    return TALCH.graph.users(this.graphRoot._id);
  }
});

Template.gsAccessManagement.events({
  'click .addMember': function(e, t) {
    // Meteor.call('invites.send', email);
  }
});
