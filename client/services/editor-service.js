
var browser;
var visualisation;

Dependency.autorun(function() {
  browser = Dependency.get('browserService');
  visualisation = Dependency.get('visualisationService');
});

Dependency.add('editorService', (function editorService() {
  var s = {
    init: null,
    context: { root: null, graph: null, view: null, selected: {} },
    view: {},
    nodes: {},
    select: null
  };

  var data = {
    root: new ReactiveVar(),
    graph: new ReactiveVar(),
    view: new ReactiveVar('list'),
    selected: {
      node: new ReactiveVar(),
      group: new ReactiveVar()
    }
  };

  /**
   * @summary Initialize service
   * @method init
   * @param {Object} [root] Knowledge graph root
   */
  s.init = function(root) {
    data.root.set(root);
    data.graph.set(cytoscape({ headless: true, elements: root.elements }));
    browser.init();
    visualisation.init();
  };

  /**
   * @summary Select graph node
   * @method select
   * @param {Object} [node] Nodes instance
   */
  s.select = function(node) {
    data.selected.node.set(node);
    if (node.type !== 'S') {
      data.selected.group.set(node);
    }
  };

  /**
   * @summary Get root node
   * @method context.root
   * @returns {Object}
   */
  s.context.root = function() {
    return data.root.get();
  };

  /**
   * @summary Get headless graph instance
   * @method context.graph
   * @returns {Object}
   */
  s.context.graph = function() {
    return data.graph.get();
  };

  /**
   * @summary Get current editor view
   * @method context.view
   * @returns {String}
   */
  s.context.view = function() {
    return data.view.get();
  };

  /**
   * @summary Get selected node
   * @method context.selected.node
   * @return {Object}
   */
  s.context.selected.node = function() {
    return data.selected.node.get();
  };

  /**
   * @summary Get last selected grouping node (R, T or O)
   * @method context.selected.group
   * @return {Object}
   */
  s.context.selected.group = function() {
    return data.selected.group.get();
  };

  /**
   * @summary Get node ids
   * @method nodes.ids
   * @param {Object} [graph] Cytoscape instance, optional, context is used otherwise
   * @returns {Array}
   */
  s.nodes.ids = function(graph) {
    var result = [];
    graph = graph || s.context.graph();

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
    parents = parents || [s.context.root()];

    Meteor.call('nodes.insert', node, function(error, _id) {
      var params = {
        competency: s.context.root(),
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

  /**
   * @summary Check if editor is in list view mode
   * @method view.isList
   */
  s.view.isList = function() {
    return data.view.get() === 'list';
  };

  /**
   * @summary Check if editor is in graph view mode
   * @method view.isGraph
   */
  s.view.isGraph = function() {
    return data.view.get() === 'graph';
  };

  /**
   * @summary Switch graph editor to list view
   * @method view.switchToList
   */
  s.view.switchToList = function() {
    if (!s.view.isList()) {
      data.view.set('list');
    }
  };

  /**
   * @summary Switch graph editor to graph view
   * @method view.switchToGraph
   */
  s.view.switchToGraph = function() {
    if (!s.view.isGraph()) {
      data.view.set('graph');
    }
  };

  return s;
})());
