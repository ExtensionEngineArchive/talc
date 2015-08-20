
Meteor.publish("knowledgeGraphs", function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    return TALCH.user.graphs(user);
  } else {
    this.ready();
  }
});

Meteor.publish("knowledgeGraphNodes", function(_id) {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (TALCH.graph.hasAccess(user, _id)) {
      return TALCH.graph.nodes(_id);
    }
  } else {
    this.ready();
  }
});
