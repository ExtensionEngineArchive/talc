
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
  'submit #addGraphMember': function(e, t) {
    e.preventDefault();
    Meteor.call('invites.graph', e.target.email.value, Template.parentData(1).graphRoot._id, e.target.role.value);
    e.target.email.value = '';
  }
});
