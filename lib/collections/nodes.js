
Nodes = new Mongo.Collection('nodes');

// Externalized properties
Nodes.TYPE = {
  list: ['C', 'T', 'O', 'S'],
  'C': {
    color: '#e74c3c',
    code: 'C',
    name: 'Competency'
  },
  'T': {
    color: '#abb7b7',
    code: 'T',
    name: 'Topic'
  },
  'O': {
    color: '#4caf50',
    code: 'O',
    name: 'Learning Objective'
  },
  'S': {
    color: '#2196f3',
    code: 'S',
    name: 'Skill'
  }
};

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
      if ((type === 'C') || (type === 'T')) {
        selector = '[type = "T"], [type = "O"]';
      } else if (type === 'O') {
        selector = '[type = "S"]';
      } else {
        throw 'Unknown node type';
      }

      node.outgoers(selector).forEach(function(el) {
        result.push(el.id());
      });
    }
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

/**
 * @summary Process node data and return standardized object
 * @method processNode
 * @param {Object} [node] Node instance
 * @returns {Object}
 */
Nodes.processNode = function(node) {
  var nodeTypes = {
    C: { name: 'Competency', style: 'success' },
    T: { name: 'Topic', style: 'primary'},
    O: { name: 'Learning Objective', style: 'info' },
    S: { name: 'Skill', style: 'danger' }
  };

  var result = {
    id: node._id,
    name: node.name,
    type: {
      code: node.type
    }
  };

  if (!nodeTypes[result.type.code]) {
    throw new Error('Unknown node type');
  }

  result.type.name = nodeTypes[result.type.code].name;
  result.style = nodeTypes[result.type.code].style;

  return result;
};

Nodes.graph = {};

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
