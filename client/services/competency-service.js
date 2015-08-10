
var browserService;
var editorService;

Dependency.autorun(function() {
  browserService = Dependency.get('browserService');
  editorService = Dependency.get('editorService');
});

Dependency.add('competencyService', (function competencyService() {
  var s = {
    nodes: {}
  };

  var data = {
    competency: new ReactiveVar(''),
    graph: new ReactiveVar('')
  };

  /**
   * @summary Initialize service context and other dependencies
   * @method init
   * @param {Object} [competency] Competency node
   */
  s.init = function(competency) {
    data.competency.set(competency);
    data.graph.set(cytoscape({ headless: true, elements: competency.elements }));
    browserService.init(data.competency.get());
    editorService.init(competency);
  };

  /**
   * @summary Get competency
   * @method competency
   * @returns {Object}
   */
  s.competency = function() {
    return data.competency.get();
  };

  /**
   * @summary Get headless graph instance
   * @method graph
   * @returns {Object}
   */
  s.graph = function() {
    return data.graph.get();
  };

  /**
   * @summary Get node ids
   * @method nodes.ids
   * @param {Object} [graph] Cytoscape instance, optional, context is used otherwise
   * @returns {Array}
   */
  s.nodes.ids = function(graph) {
    var result = [];
    graph = graph || s.graph();

    graph.nodes().forEach(function(it) {
      result.push(it.id());
    });

    return result;
  };

  /**
   * @summary Add node
   * @method nodes.add
   * @param {Object} [node] Node data
   * @param {Array} [parents] Parent nodes
   */
  s.nodes.add = function(node, parents) {
    parents = parents || [s.competency()];

    Meteor.call('nodes.insert', node, function(error, _id) {
      var params = {
        competency: s.competency(),
        node: Nodes.findOne({ _id: _id }),
        parents: parents
      };

      Meteor.call('competencies.node.add', params);
    });
  };

  /**
   * @summary Filter nodes by name
   * @method nodes.findAllByName
   * @param {String} [search] Search string
   * @param {Number} [limit] Max number of results, 30 default
   * @returns {Array}
   */
  s.nodes.findAllByName = function(search, limit) {
    limit = limit || 30;
    search = search || '';

    return Nodes.find({
      $and: [
        { _id: { $in: s.nodes.ids() } },
        { name: new RegExp('^' + search.toLowerCase(), 'i') }
      ]
    },
    { limit: limit }).fetch();
  };

  return s;
})());
