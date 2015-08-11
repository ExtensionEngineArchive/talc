
var editorService;

Dependency.autorun(function() {
  editorService = Dependency.get('editorService');
});

Dependency.add('browserService', (function browserService() {
  var s = {};

  var data = {
    path: new ReactiveVar([])
  };

  /**
   * @summary Initialize browser service
   * @method init
   * @param {Object} [root] Root node (competency)
   */
  s.init = function(root) {
    data.path.set([root]);
  };

  /**
   * @summary Set the next level of competency hierarchy
   * @method forward
   * @param {Object} [node] Topic node
   */
  s.forward = function(node) {
    if (node.type === 'T') {
      var path = data.path.get();
      path.push(node);
      data.path.set(path);
      editorService.context.select(node);
    }
  };

  /**
   * @summary Go to the previous level of competency hierarchy
   * @method back
   */
  s.back = function(root) {
    var path = data.path.get();

    while (path[path.length-1]._id !== root._id) {
      path.pop();
    }
    
    data.path.set(path);
    editorService.context.select(s.root());
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

  return s;
})());
