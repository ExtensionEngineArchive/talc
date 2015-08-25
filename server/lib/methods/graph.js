
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
      type: 'R',
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
  'graph.node.add': function(params) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var user = Meteor.user();
    if (!TALCH.user.hasEditGraphPermission(user, params.root._id)) {
      throw new Meteor.Error("not-authorized");
    }

    params.node._id = Nodes.insert({
      name: params.node.name,
      type: params.node.type,
      roots: [params.root._id]
    });

    Nodes.findAndModify({
      query: { _id: params.root._id },
      update: {
        $push: {
          'elements.nodes': Nodes.graph.createNode(params.node),
          'elements.edges': {
            $each: Nodes.graph.createEdges(Lazy(params.parents).pluck('_id'), params.node._id)
          }
        }
      }
    });
  },
  'graph.node.remove': function(nodeId, rootId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var user = Meteor.user();
    if (!TALCH.user.hasEditGraphPermission(user, rootId)) {
      throw new Meteor.Error("not-authorized");
    }

    var node = Nodes.findOne({ _id: nodeId });
    if (node.roots.length === 1) {
      Nodes.remove({ _id: nodeId });
    }

    Nodes.findAndModify({
      query: { _id: rootId },
      update: {
        $pull: {
          'elements.nodes': { 'data.id': nodeId },
          'elements.edges': { 'data.target': nodeId },
        }
      }
    });
  }
});
