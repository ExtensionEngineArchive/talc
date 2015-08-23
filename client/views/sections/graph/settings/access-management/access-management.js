
Template.gsAccessManagement.helpers({
  members: function() {
    return TALCH.graph.users(this.graphRoot._id);
  },
  autocompleteEmail: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [{
        token: '',
        collection: Meteor.users,
        field: "emails.0.address",
        template: Template.autocompleteUser
      }]
    };
  }
});

Template.gsAccessManagement.events({
  'click .addMember': function(e, t) {
    // Meteor.call('invites.send', email);
  }
});
