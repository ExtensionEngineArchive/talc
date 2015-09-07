
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
    nodes: { parent: {} },
    modals: { edit: {} },
    select: null
  };

  var data = {
    root: new ReactiveVar(),
    graph: new ReactiveVar(),
    view: new ReactiveVar('list'),
    selected: {
      node: new ReactiveVar(),
      group: new ReactiveVar()
    },
    modals: {
      edit: {
        rendered: new ReactiveVar(false),
        node: new ReactiveVar()
      }
    }
  };

  /**
   * @summary Initialize service
   * @method init
   * @param {Object} [root] Knowledge graph root
   */
  s.init = function(root) {
    data.root.set(root);

    var graph = cytoscape({ headless: true, elements: root.elements });
    TALCH.graph.numberNodes(graph.$('#' + root._id));
    data.graph.set(graph);

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
   * @summary Check if edit modal should be rendered
   * @method modals.edit.rendered
   * @return {Boolean}
   */
  s.modals.edit.rendered = function() {
    return data.modals.edit.rendered.get();
  };

  /**
   * @summary Show create node modal
   * @method modals.edit.new
   */
  s.modals.edit.new = function() {
    s.modals.edit.hide();
    data.modals.edit.node.set(null);
    s.modals.edit.show();
  };

  /**
   * @summary Show update node modal
   * @method modals.edit.update
   * @param {Object} [node]
   */
  s.modals.edit.update = function(node) {
    s.modals.edit.hide();
    data.modals.edit.node.set(node);
    s.modals.edit.show();
  };

  /**
   * @summary Show edit (node) modal
   * @method modals.edit.show
   */
  s.modals.edit.show = function() {
    setTimeout(function() {
      data.modals.edit.rendered.set(true);
      setTimeout(function() { $('#ceNodeModal').modal('show'); }, 10);
    }, 10);
  };

  /**
   * @summary Hide edit (node) modal
   * @method modals.edit.hide
   */
  s.modals.edit.hide = function() {
    if (s.modals.edit.rendered()) {
      data.modals.edit.rendered.set(false);
    }
  };

  /**
   * @summary Data context for edit (node) modal
   * @method modals.edit.node
   * @return {Object}
   */
  s.modals.edit.node = function() {
    return data.modals.edit.node.get();
  };

  /**
   * @summary Get node ids
   * @method nodes.ids
   * @param {Object} [graph] Cytoscape instance, optional, context is used otherwise
   * @returns {Array}
   */
  s.nodes.ids = function(graph) {
    graph = graph || s.context.graph();
    return Nodes.graph.ids(graph);
  };

  /**
   * @summary Get node number (String)
   * @method nodes.number
   * @param {String} [_id] Node id
   * @returns {String}
   */
  s.nodes.number = function(_id) {
    var graph = s.context.graph();
    var node = graph.$('#' + _id);

    return node.data('number');
  };

  /**
   * @summary Get node parents
   * @method nodes.parents
   * @param {String} [_id] Node id
   * @returns {Collection.Cursor}
   */
  s.nodes.parents = function(_id) {
    return Nodes.find({ _id: { $in: Nodes.getParents(s.context.graph(), _id) }});
  };

  /**
   * @summary Get node children
   * @method nodes.children
   * @param {String} [_id] Node id
   * @returns {Collection.Cursor}
   */
  s.nodes.children = function(_id) {
    return Nodes.find({
      _id: {
        $in: Nodes.getChildren(s.context.graph(), _id)
      }
    }, { sort: { createdAt: 1 } });
  };

  /**
   * @summary Add node
   * @method nodes.add
   * @param {Object} [node] Node data
   * @param {Array} [parents] Parent nodes
   */
  s.nodes.add = function(node, parents) {
    parents = parents || [s.context.root()];

    var params = {
      node: node,
      root: s.context.root(),
      parents: parents
    };

    Meteor.call('graph.node.add', params);
  };

  /**
   * @summary Remove node from graph
   * @method nodes.remove
   * @param {String} [nodeId] Node id
   */
  s.nodes.remove = function(nodeId) {
    Meteor.call('graph.node.remove', nodeId, s.context.root()._id);
  };

  /**
   * @summary Add parent node
   * @method nodes.parent.add
   * @param {String} [nodeId]
   * @param {String} [parentId]
   */
  s.nodes.parent.add = function(nodeId, parentId) {
    Meteor.call('graph.parent.add', s.context.root()._id, nodeId, parentId);
  };

  /**
   * @summary Remove parent node
   * @method nodes.parent.add
   * @param {String} [nodeId]
   * @param {String} [parentId]
   */
  s.nodes.parent.remove = function(nodeId, parentId) {
    Meteor.call('graph.parent.remove', s.context.root()._id, nodeId, parentId);
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
   * @summary Check if editor is in outline view mode
   * @method view.isOutline
   */
  s.view.isOutline = function() {
    return data.view.get() === 'outline';
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

  /**
   * @summary Switch graph editor to outline view
   * @method view.switchToOutline
   */
  s.view.switchToOutline = function() {
    if (!s.view.isOutline()) {
      data.view.set('outline');
    }
  };

  return s;
})());
