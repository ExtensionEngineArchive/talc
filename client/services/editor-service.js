
Dependency.add('editorService', (function editorService() {
  var s = {
    view: {},
    context: { selected: {} }
  };

  var data = {
    view: new ReactiveVar('list'),
    graph: false,
    competency: null,
    plotBackoff: null,
    context: {
      selected: {
        node: new ReactiveVar(''),
        group: new ReactiveVar('')
      }
    }
  };

  /**
   * @summary Initialize service context
   * @method init
   * @param {Object} [competency] Competency node
   */
  s.init = function(competency) {
    data.competency = competency;
    s.context.select(competency);

    if (data.graph && s.view.isGraph()) {
      clearTimeout(data.plotBackoff);
      data.plotBackoff = setTimeout(function() {
        createGraph();
      }, 50);
    }
  };

  /**
   * @summary Select node
   * @method context.select
   * @param {Object} [node] Nodes instance
   */
  s.context.select = function(node) {
    data.context.selected.node.set(node);
    if (node.type !== 'S') {
      data.context.selected.group.set(node);
    }
  };

  /**
   * @summary Get selected node
   * @method context.selected.node
   * @return {Object}
   */
  s.context.selected.node = function() {
    return data.context.selected.node.get();
  };

  /**
   * @summary Get last selected grouping node (C, T or O)
   * @method context.selected.group
   * @return {Object}
   */
  s.context.selected.group = function() {
    return data.context.selected.group.get();
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
   * @summary Switch competency editor to list view
   * @method view.switchToList
   */
  s.view.switchToList = function() {
    if (!s.view.isList()) {
      data.view.set('list');
    }
  };

  /**
   * @summary Switch competency editor to graph view
   * @method view.switchToGraph
   */
  s.view.switchToGraph = function() {
    if (!s.view.isGraph()) {
      data.view.set('graph');
      setTimeout(function() {
        createGraph();
      }, 1);
    }
  };

  /**
   * @summary Create competency graph inside competency editor
   * @method createGraph
   */
  function createGraph() {
    var competency = data.competency;

    data.graph = cytoscape({
      container: document.getElementById('competencyGraph'),
      elements: competency.elements,
      layout: {
        name: 'breadthfirst',
        directed: true,
        roots: ('#' + competency._id),
        padding: 10
      },
      style: [{
        selector: '[type = "C"]',
        style: {
          'background-color': Nodes.TYPE.C.color,
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

    data.graph.on('tap', 'node', {}, function(e) {
      var node = Nodes.findOne({ _id: e.cyTarget.id() });
      s.context.select(node);
    });
  }

  return s;
})());
