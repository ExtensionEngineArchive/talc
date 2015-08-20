
// TALC HELPERS
TALCH = { user: {}, graph: {} };

/**
 * @summary Check if user is global admin
 * @method user.isAdmin
 * @param {Object} [user] Instance of Meteor.users collection
 * @returns {Boolean}
 */
TALCH.user.isAdmin = function(user) {
  return Roles.userIsInRole(user, ['admin'], 'global');
};

/**
 * @summary Check if user can create new graph
 * @method user.hasCreateGraphPermission
 * @param {Object} [user] Instance of Meteor.users collection
 * @returns {Boolean}
 */
TALCH.user.hasCreateGraphPermission = function(user) {
  if (TALCH.user.isAdmin(user) || (Roles.userIsInRole(user, ['graph-create'], 'global'))) {
    return true;
  } else {
    return false;
  }
};

/**
 * @summary Retrieve all graph ids that user is related to
 * @method user.graphIds
 * @param {Object} [user] Instance of Meteor.users collection
 * @returns {Array}
 */
TALCH.user.graphIds = function(user) {
  return Lazy(Roles.getGroupsForUser(user)).without('global').toArray();
};

/**
 * @summary Retrieve all graph nodes that user is related to
 * @method user.graphs
 * @param {Object} [user] Instance of Meteor.users collection
 * @returns {Collection.Cursor}
 */
TALCH.user.graphs = function(user) {
  if (TALCH.user.isAdmin(user)) {
    return Nodes.find({ type: 'C' });
  } else {
    return Nodes.find({
      $and: [
        { type: 'C' },
        { _id: { $in: TALCH.user.graphIds(user) } }
      ]
    });
  }
};

/**
 * @summary Check if user has privilegies to access graph nodes
 * @method graph.hasAccess
 * @param {Object} [user] Instance of Meteor.users collection
 * @param {String} [graphId] Graph root node _id
 * @returns {Boolean}
 */
TALCH.graph.hasAccess = function(user, graphId) {
  if (TALCH.user.isAdmin(user)) {
    return true;
  }

  var groups = Roles.getGroupsForUser(user);
  if (Lazy(groups).contains(graphId)) {
    return true;
  }

  return false;
};

/**
 * @summary Retrieve graph nodes from the DB
 * @method graph.nodes
 * @param {String} [graphId] Graph root node _id
 * @returns {Collection.Cursor}
 */
TALCH.graph.nodes = function(graphId) {
  var root = Nodes.findOne({ _id: graphId });
  if (root) {
    var graph = cytoscape({ headless: true, elements: root.elements });
    return Nodes.find({ _id: { $in: Nodes.graph.ids(graph) } });
  }

  return [];
};

Object.freeze(TALCH);
