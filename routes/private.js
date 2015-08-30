
Router.route('/', {
  name: 'dashboard'
});

Router.route('/graph/:_id/editor', {
  name: 'graph.editor',
  template: 'graphEditor',
  subscriptions: function() {
    this.subscribe('knowledgeGraphNodes', this.params._id).wait();
    this.subscribe('graphComments', this.params._id);
  },
  data: function() {
    var graphRoot = Nodes.findOne({ _id: this.params._id });
    if (graphRoot) {
      Dependency.get('editorService').init(graphRoot);
    }
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});

Router.route('/graph/:_id/settings', {
  name: 'graph.settings',
  template: 'gSettings',
  data: function() {
    var graphRoot = Nodes.findOne({ _id: this.params._id });
    if (graphRoot) {
      return { graphRoot: graphRoot };
    }
  }
});
