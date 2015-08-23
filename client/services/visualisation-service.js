
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Dependency.add('visualisationService', (function visualisationService() {
  var s = { editor: {} };

  var data = {
    editor: {
      graph: {
        instance: null,
        timeout: null
      }
    }
  };

  s.init = function() {
    if (editor.context.graph() && editor.view.isGraph()) {
      clearTimeout(data.editor.graph.timeout);
      data.editor.graph.timeout = setTimeout(function() {
        data.editor.graph.instance = s.editor.knowledgeGraph(editor.context.root());
      }, 50);
    }
  };

  /**
   * @summary Create knowledge graph
   * @method editor.knowledgeGraph
   */
  s.editor.knowledgeGraph = function(root) {
    var graph = cytoscape({
      container: document.getElementById('knowledgeGraph'),
      elements: root.elements,
      layout: {
        name: 'breadthfirst',
        directed: true,
        roots: ('#' + root._id),
        padding: 10
      },
      style: [{
        selector: '[type = "R"]',
        style: {
          'background-color': Nodes.TYPE.R.color,
          'width': 50,
          'height': 50,
          'content': 'data(type)'
        }
      },
      {
        selector: '[type = "T"]',
        style: {
          'background-color': Nodes.TYPE.T.color,
          'width': 40,
          'height': 40,
          'content': 'data(type)'
        }
      },
      {
        selector: '[type = "O"]',
        style: {
          'background-color': Nodes.TYPE.O.color,
          'width': 30,
          'height': 30,
          'content': 'data(type)'
        }
      },
      {
        selector: '[type = "S"]',
        style: {
          'background-color': Nodes.TYPE.S.color,
          'width': 20,
          'height': 20,
          'content': 'data(type)'
        }
      }]
    });

    graph.on('tap', 'node', {}, function(e) {
      var node = Nodes.findOne({ _id: e.cyTarget.id() });
      editor.context.select(node);
    });

    return graph;
  };

  return s;
})());
