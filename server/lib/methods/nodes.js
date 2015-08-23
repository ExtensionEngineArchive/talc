
Meteor.methods({
  'nodes.insert': function(params) {
    return Nodes.insert({
      name: params.name,
      type: params.type
    });
  },
  'nodes.update': function(params) {
    Nodes.update(params._id, {
      $set: {
        name: params.name
      }
    });
  },
  'nodes.delete': function(_id) {
    Nodes.delete(_id);
  }
});
