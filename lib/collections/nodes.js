
Nodes = new Mongo.Collection('nodes');

// Reference settings
Nodes.TYPE = Meteor.settings.public.node;

/**
 * @summary For provided Cytoscape instance and node id return child nodes (id)
 * @method getChildren
 * @param {Object} [cy] Instance of Cytoscape.js
 * @param {String} [id] Node id
 * @returns {Array}
 */
Nodes.getChildren = function(cy, id) {
  var node = cy.$('#' + id);
  var result = [];
  var type;
  var selector;

  if (node.length !== 0) {
    type = node.data('type');

    if (type !== 'S') {
      if ((type === 'R') || (type === 'T')) {
        selector = '[type = "T"], [type = "O"]';
      } else if (type === 'O') {
        selector = '[type = "S"]';
      } else {
        throw new Error('Unknown node type');
      }

      node.outgoers(selector).forEach(function(el) {
        result.push(el.id());
      });
    }
  }

  return result;
};

/**
 * @summary For provided Cytoscape instance and node id return parent nodes (id)
 * @method getParents
 * @param {Object} [cy] Instance of Cytoscape.js
 * @param {String} [id] Node id
 * @returns {Array}
 */
Nodes.getParents = function(cy, id) {
  var node = cy.$('#' + id);
  var result = [];

  if (node.length !== 0) {
    node.incomers().forEach(function(el) {
      result.push(el.id());
    });
  }

  return result;
};

/**
 * @summary For provided Cytoscape instance and node id return skill nodes (id)
 * @method getSkills
 * @param {Object} [cy] Instance of Cytoscape.js
 * @param {String} [id] Node id
 * @returns {Array}
 */
Nodes.getSkills = function(cy, id) {
  var node = cy.$('#' + id);
  var result = [];

  if (node.length !== 0) {
    node.successors('[type = "S"]').forEach(function(el) {
      result.push(el.id());
    });
  }

  return result;
};

Nodes.graph = {};

/**
 * @summary For provided Cytoscape instance return node ids
 * @method graph.ids
 * @param {Object} [graph] Instance of Cytoscape.js
 * @returns {Array}
 */
Nodes.graph.ids = function(graph) {
  var result = [];
  graph.nodes().forEach(function(it) {
    result.push(it.id());
  });

  return result;
};

/**
 * @summary Create node for Cytoscape.js
 * @method createNode
 * @param {Object} [node] Nodes collection instance
 * @returns {Object}
 */
Nodes.graph.createNode = function(node) {
  return {
    data: {
      id: node._id,
      type: node.type
    }
  };
};

/**
 * @summary Create edge from parent to child node (for Cytoscape.js)
 * @method createEdge
 * @param {String} [parent] Parent node id
 * @param {String} [child] Child node id
 * @returns {Object}
 */
Nodes.graph.createEdge = function(parent, child) {
  return {
    data: {
      source: parent,
      target: child
    }
  };
};

/**
 * @summary Create edges from multiple parent nodes to child node (Cytoscape.js)
 * @method createEdges
 * @param {Array} [parents] Parent node ids
 * @param {String} [child] Child node id
 * @returns {Array}
 */
Nodes.graph.createEdges = function(parents, child) {
  var result = [];

  Lazy(parents).each(function(it) {
    result.push(Nodes.graph.createEdge(it, child));
  });

  return result;
};
