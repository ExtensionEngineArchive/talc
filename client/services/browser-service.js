
Dependency.add('browserService', (function browserService() {
  var s = {};
  var data = {
    path: new ReactiveVar([]),
    selected: new ReactiveVar()
  };

  s.init = function(root) {
    var node = root;
    data.path.set([node]);
    data.selected.set(node);
  };

  s.forward = function(node) {
    if (node.type === 'T') {
      var path = data.path.get();
      path.push(node);
      data.path.set(path);
      data.selected.set(node);
    }
  };

  s.back = function() {
    var path = data.path.get();
    path.pop();
    data.path.set(path);
    data.selected.set(s.root());
  };

  s.select = function(node) {
    var temp = node;
    data.selected.set(temp);
  };

  s.selected = function() {
    return data.selected.get();
  };

  s.root = function() {
    var path = data.path.get();
    return path[path.length-1];
  };

  s.parent = function() {
    var path = data.path.get();
    if (path.length > 1) {
      return path[path.length-2];
    }

    return null;
  };

  s.path = function() {
    return data.path.get();
  };

  return s;
})());
