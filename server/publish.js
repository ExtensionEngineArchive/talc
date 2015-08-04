
// TODO: Publish user related nodes
Meteor.publish("allNodes", function() {
  return Nodes.find();
});
