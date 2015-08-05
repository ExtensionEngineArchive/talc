
Nodes = new Mongo.Collection('nodes');

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

/**
 * @summary Create edge from parent to child node
 * @method createEdge
 * @param {String} [parent] Parent node id
 * @param {String} [child] Child node id
 * @returns {Object}
 */
Nodes.createEdge = function(parent, child) {
  return {
    data: {
      source: parent,
      target: child
    }
  };
};

/**
 * @summary Create edges from multiple parent nodes to child node
 * @method createEdges
 * @param {Array} [parents] Parent node ids
 * @param {String} [child] Child node id
 * @returns {Array}
 */
Nodes.createEdges = function(parents, child) {
  var result = [];
  var i;

  for (i = 0; i < parents.length; i++) {
    result.push(Nodes.createEdge(parents[i], child));
  }

  return result;
};
