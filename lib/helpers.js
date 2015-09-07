
// TODO: Fix global roles

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
 * @summary Check if user has admin access to specific graph
 * @method user.isGraphAdmin
 * @param {Object} [user] Instance of Meteor.users collection
 * @param {String} [_id] id of root graph node (Nodes collection)
 * @returns {Boolean}
 */
TALCH.user.isGraphAdmin = function(user, _id) {
  if (TALCH.user.isAdmin(user) || Roles.userIsInRole(user, ['admin'], _id)) {
    return true;
  } else {
    return false;
  }
};

/**
 * @summary Check if user can edit the graph
 * @method user.hasEditGraphPermission
 * @param {Object} [user] Instance of Meteor.users collection
 * @param {String} [_id] Root node id
 * @returns {Boolean}
 */
TALCH.user.hasEditGraphPermission = function(user, _id) {
  if (TALCH.user.isAdmin(user) || (Roles.userIsInRole(user, ['admin', 'active-collaborator'], _id))) {
    return true;
  } else {
    return false;
  }
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
    return Nodes.find({ type: 'R' });
  } else {
    return Nodes.find({
      $and: [
        { type: 'R' },
        { _id: { $in: TALCH.user.graphIds(user) } }
      ]
    });
  }
};

/**
 * @summary Retrieve users associated with graph
 * @method graph.users
 * @param {String} [_id] Graph root node _id
 * @returns {Collection.Cursor}
 */
TALCH.graph.users = function(_id) {
  var field = 'roles.' + _id;
  var query = {};
  query[field] = { $exists: true, $ne: [] };

  return Meteor.users.find(query);
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
  return Nodes.find({ roots: graphId });
};

/**
 * @summary Retrieve list of graph roles
 * @method graph.roles
 * @returns {Array}
 */
TALCH.graph.roles = function() {
  return ['admin', 'active-collaborator', 'passive-collaborator'];
};

/**
 * @summary For provided Cytoscape node return child nodes
 * @method graph.getChildNodes
 * @param {Object} [node]
 * @returns {Array}
 */
TALCH.graph.getChildNodes = function(node) {
  var type;
  var selector;

  if (node && node.length !== 0) {
    type = node.data('type');

    if (type !== 'S') {
      if ((type === 'R') || (type === 'T')) {
        selector = '[type = "T"], [type = "O"]';
      } else if (type === 'O') {
        selector = '[type = "S"]';
      } else {
        throw new Error('Unknown node type');
      }

      return node.outgoers(selector).toArray();
    }
  }

  return [];
};

/**
 * @summary Add node number (String) to each graph node (Recursive)
 * @method graph.numberNodes
 * @param {Object} [node]
 * @param {String} [level] Omitted when root node is passed
 */
TALCH.graph.numberNodes = function(node, level) {
  level = level || '';

  var i = 1;
  var children = TALCH.graph.getChildNodes(node);

  node.data('number', level);

  level = level ? (level + '.') : '';
  Lazy(children).each(function(node) {
    TALCH.graph.numberNodes(node, level + i);
    i++;
  });
};

/**
 * @summary Validate graph role
 * @method graph.isValidRole
 * @param {String} [role]
 * @returns {Boolean}
 */
TALCH.graph.isValidRole = function(role) {
  return Lazy(TALCH.graph.roles()).contains(role);
};

Object.freeze(TALCH);
