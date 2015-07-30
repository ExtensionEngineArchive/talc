
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
