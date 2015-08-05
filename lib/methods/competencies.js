
Meteor.methods({
  'competencies.insert': function(params) {
    Nodes.insert({
      name: params.name,
      description: params.description,
      type: 'C'
    });
  },
  'competencies.node.add': function(params) {
    Nodes.findAndModify({
      query: { _id: params.competency._id },
      update: {
        $push: {
          'elements.nodes': Nodes.graph.createNode(params.node),
          'elements.edges': {
            $each: Nodes.graph.createEdges(Lazy(params.parents).pluck('_id'), params.node._id)
          }
        }
      }
    });
  }
});
