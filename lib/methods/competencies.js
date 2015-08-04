
Meteor.methods({
  'competencies.insert': function(params) {
    Nodes.insert({
      name: params.name,
      type: 'C'
    });
  }
});
