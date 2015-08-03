
Dependency.add('browserService', (function browserService() {
  var s = {};
  var data = {
    path: new ReactiveVar([])
  };

  s.init = function(root) {
    var node = processNode(root);
    data.path.set([node]);
  };

  s.forward = function(root) {
    var node = processNode(root);
    var path = data.path.get();
    path.push(node);
    data.path.set(path);
  };

  s.back = function() {
    var path = data.path.get();
    path.pop();
    data.path.set(path);
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

  function processNode(node) {
    var result = {
      id: node._id,
      name: node.name,
      type: {
        code: (node.type || 'C')
      }
    };

    if (result.type.code === 'C') {
      result.type.name = 'Competency';
      result.style = 'success';
    } else if (result.type.code === 'T') {
      result.type.name = 'Topic';
      result.style = 'primary';
    } else if (result.type.code === 'O') {
      result.type.name = 'Learning Objective';
      result.style = 'info';
    } else if (result.type.code === 'S') {
      result.type.name = 'Skill';
      result.style = 'danger';
    } else {
      throw 'Unknown node type';
    }

    return result;
  }

  return s;
})());
