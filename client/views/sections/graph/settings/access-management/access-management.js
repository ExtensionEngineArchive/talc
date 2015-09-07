
Template.gsAccessManagement.helpers({
  members: function() {
    var members = TALCH.graph.users(this.graphRoot._id).fetch();
    return members.length > 0 ? members : null;
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
  },
  hasRole: function(user, role) {
    var root = Template.parentData(1).graphRoot;
    return Roles.userIsInRole(user, [role], root._id) ? 'checked' : '';
  }
});

Template.gsAccessManagement.events({
  'submit #addGraphMember': function(e, t) {
    e.preventDefault();
    Meteor.call('invites.graph', e.target.email.value, Template.parentData(1).graphRoot._id, e.target.role.value);
    e.target.email.value = '';
  },
  'click .remove': function(e, t) {
    Meteor.call('graph.role.remove', this._id, Template.parentData(1).graphRoot._id);
  },
  'click .select-role': function(e, t) {
    Meteor.call('graph.role.update', this._id, Template.parentData(1).graphRoot._id, e.currentTarget.value);
  }
});
