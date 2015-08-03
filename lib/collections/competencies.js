
Competencies = new Mongo.Collection('competencies');

/**
 * @summary For provided Cytoscape instance and node id return child nodes (id)
 * @method getChildren
 * @param {Object} [cy] Instance of Cytoscape.js
 * @param {String} [id] Node id
 * @returns {Array}
 */
Competencies.getChildren = function(cy, id) {
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
Competencies.getSkills = function(cy, id) {
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
 * @param {Object} [node] Competency or Node instance
 * @returns {Object}
 */
Competencies.processNode = function(node) {
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
      code: (node.type || 'C')
    }
  };

  if (!nodeTypes[result.type.code]) {
    throw new Error('Unknown node type');
  }

  result.type.name = nodeTypes[result.type.code].name;
  result.style = nodeTypes[result.type.code].style;

  return result;
};
