
// TODO: Graph creation must be transactional
Meteor.methods({
  'graph.create': function(params) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var user = Meteor.user();
    if (!TALCH.user.hasCreateGraphPermission(user)) {
      throw new Meteor.Error("not-authorized");
    }

    var _id = Nodes.insert({
      name: params.name,
      description: params.description,
      type: 'C',
      elements: {
        nodes: [],
        edges: []
      },
      createdAt: new Date(),
      createdBy: user._id
    });

    Nodes.findAndModify({
      query: { _id: _id },
      update: {
        $push: {
          'elements.nodes': Nodes.graph.createNode(Nodes.findOne({ _id: _id })),
        }
      }
    });

    if (!TALCH.user.isAdmin(user)) {
      Roles.addUsersToRoles(user._id, ['admin'], _id);
    }
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
