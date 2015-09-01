
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
        layout: new ReactiveVar('breadthfirst'),
        timeout: null
      }
    }
  };

  s.init = function() {
    if (editor.context.graph() && editor.view.isGraph() && data.editor.graph.layout.get()) {
      clearTimeout(data.editor.graph.timeout);
      data.editor.graph.timeout = setTimeout(function() {
        data.editor.graph.instance = s.editor.knowledgeGraph(editor.context.root(), data.editor.graph.layout.get());
      }, 10);
    }
  };

  /**
   * @summary Create knowledge graph
   * @method editor.knowledgeGraph
   * @param {Object} [root] root node
   * @param {String} [layout] Cytoscape.js layout name
   */
  s.editor.knowledgeGraph = function(root, layout) {
    layout = layout || 'breadthfirst';

    var graph = cytoscape({
      container: document.getElementById('knowledgeGraph'),
      elements: root.elements,
      layout: {
        name: layout,
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
          'content': 'data(number)'
        }
      },
      {
        selector: '[type = "T"]',
        style: {
          'background-color': Nodes.TYPE.T.color,
          'width': 40,
          'height': 40,
          'content': 'data(number)'
        }
      },
      {
        selector: '[type = "O"]',
        style: {
          'background-color': Nodes.TYPE.O.color,
          'width': 30,
          'height': 30,
          'content': 'data(number)'
        }
      },
      {
        selector: '[type = "S"]',
        style: {
          'background-color': Nodes.TYPE.S.color,
          'width': 20,
          'height': 20,
          'content': 'data(number)'
        }
      }]
    });

    graph.on('tap', 'node', {}, function(e) {
      var node = Nodes.findOne({ _id: e.cyTarget.id() });
      editor.select(node);
    });

    return graph;
  };

  /**
   * @summary Set knowledge graph layout
   * @method editor.setKnowledgeGraphLayout
   */
  s.editor.setKnowledgeGraphLayout = function(layout) {
    if (Lazy(['concentric', 'breadthfirst', 'grid', 'circle', 'cose', 'cola', 'springy']).contains(layout)) {
      data.editor.graph.layout.set(layout);
    }
  };

  return s;
})());
