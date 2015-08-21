
Template.geAccessManagement.helpers({
  members: function() {
    return TALCH.graph.users(this.graphRoot._id);
  }
});
