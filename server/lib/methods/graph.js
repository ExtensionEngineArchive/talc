
// --------------------------------------------------------------------
// Graph creation and editing
// TODO: Transactional
// --------------------------------------------------------------------

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
          'elements.nodes': Nodes.graph.createNode(Nodes.findOne({ _id: _id }))
        }
      }
    });

    if (!TALCH.user.isAdmin(user)) {
      Roles.addUsersToRoles(user._id, ['admin'], _id);
    }
  },
  'graph.node.add': function(params) {
    if (!hasEditGraphPermission(params.root._id)) {
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
    if (!hasEditGraphPermission(rootId)) {
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
          'elements.edges': {
            $or: [
              { 'data.target': nodeId },
              { 'data.source': nodeId }
            ]
          }
        }
      }
    });
  },
  'graph.parent.add': function(rootId, nodeId, parentId) {
    if (!hasEditGraphPermission(rootId)) {
      throw new Meteor.Error("not-authorized");
    }

    Nodes.findAndModify({
      query: { _id: rootId },
      update: {
        $push: {
          'elements.edges': Nodes.graph.createEdge(parentId, nodeId)
        }
      }
    });
  },
  'graph.parent.remove': function(rootId, nodeId, parentId) {
    if (!hasEditGraphPermission(rootId)) {
      throw new Meteor.Error("not-authorized");
    }

    Nodes.findAndModify({
      query: { _id: rootId },
      update: {
        $pull: {
          'elements.edges': { 'data.source': parentId, 'data.target': nodeId }
        }
      }
    });
  },
  'graph.role.update': function(userId, graphId, role) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var user = Meteor.user();
    if (!TALCH.user.isGraphAdmin(user)) {
      throw new Meteor.Error("not-authorized");
    }

    Roles.setUserRoles(userId, [role], graphId);
  }
});

// --------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------

function hasEditGraphPermission(graphId) {
  if (!Meteor.userId()) {
    return false;
  }

  var user = Meteor.user();
  if (!TALCH.user.hasEditGraphPermission(user, graphId)) {
    return false;
  }

  return true;
}
