
Meteor.publishComposite('knowledgeGraphs', {
  find: function() {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, { limit: 1 });
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
