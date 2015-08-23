
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Dependency.add('browserService', (function browserService() {
  var s = {};

  var data = {
    path: new ReactiveVar([]),
    items: new ReactiveVar([])
  };

  /**
   * @summary Initialize browser service
   * @method init
   */
  s.init = function() {
    var path = data.path.get();
    if (!path.length || (path[0]._id !== editor.context.root()._id)) {
      data.path.set([]);
      s.forward(editor.context.root());
    }

    updateItems();
  };

  /**
   * @summary Set the next level of graph hierarchy
   * @method forward
   * @param {Object} [node] R or T node
   */
  s.forward = function(node) {
    if ((node.type === 'T') || node.type === 'R') {
      var path = data.path.get();
      path.push(node);
      data.path.set(path);
      editor.select(node);
    }
  };

  /**
   * @summary Go to the previous level of graph hierarchy
   * @method back
   * @param {Object} [root] new (browser context) root node
   */
  s.back = function(root) {
    var path = data.path.get();

    while (path[path.length-1]._id !== root._id) {
      path.pop();
    }

    data.path.set(path);
    editor.select(s.root());
  };

  /**
   * @summary Get root node of browser context
   * @method root
   * @return {Object}
   */
  s.root = function() {
    var path = data.path.get();
    return path[path.length-1];
  };

  /**
   * @summary Retrieve root node parent
   * @method parent
   * @return {Object}
   */
  s.parent = function() {
    var path = data.path.get();
    if (path.length > 1) {
      return path[path.length-2];
    }

    return null;
  };

  /**
   * @summary Get browser path
   * @method path
   * @return {Array}
   */
  s.path = function() {
    return data.path.get();
  };

  /**
   * @summary Get items on current path
   * @method items
   * @return {Array}
   */
  s.items = function() {
    return data.items.get();
  };

  /**
   * @summary Update browser items
   * @method updateItems
   */
  function updateItems() {
    var graph = editor.context.graph();
    var node = graph.$('#' + s.root()._id);
    var children = [];

    node.outgoers('[type = "T"], [type = "O"]').forEach(function(it) {
      children.push(it.id());
    });

    data.items.set(Nodes.find({ _id : { $in : children } }).fetch());
  }

  return s;
})());
