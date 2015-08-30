
Meteor.publishComposite('knowledgeGraphs', {
  find: function() {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, { limit: 1 });
    } else {
      this.ready();
    }
  },
  children: [{
    find: function(user) {
      return TALCH.user.graphs(user);
    }
  }]
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

Meteor.publish("users", function() {
  if (this.userId) {
    return Meteor.users.find({}, { fields: { 'profile.firstName': 1, 'profile.lastName': 1, 'emails': 1, 'status': 1, 'roles': 1 }});
  } else {
    this.ready();
  }
});

Meteor.publish("graphComments", function(graphId) {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (TALCH.graph.hasAccess(user, graphId)) {
      return Comments.find({ graphId: graphId });
    }
  } else {
    this.ready();
  }
});
