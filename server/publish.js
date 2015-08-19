
Meteor.publish("knowledgeGraphs", function() {
  var user = Meteor.users.findOne(this.userId);
  if (user) {
    if (user.profile.admin) {
      return Nodes.find({ type: 'C' });
    }

    return Nodes.find({
      $and: [
        { type: 'C' },
        { users: { $elemMatch: { _id: this.userId } } }
      ]
    });
  }
});

Meteor.publish("knowledgeGraphNodes", function(_id) {
  var user = Meteor.users.findOne(this.userId);
  if (user) {
    var root = Nodes.findOne({ _id: _id });
    if (root) {
      if (user.profile.admin || (Lazy(root.users).findWhere({ _id: user._id }))) {
        var graph = cytoscape({ headless: true, elements: root.elements });
        return Nodes.find({ _id: { $in: Nodes.graph.ids(graph) } });
      }
    }
  }
});
