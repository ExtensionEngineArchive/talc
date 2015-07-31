
// TODO: Publish user related competencies
Meteor.publish("allCompetencies", function() {
  return Competencies.find();
});

// TODO: Publish user related nodes
Meteor.publish("allNodes", function() {
  return Nodes.find();
});
