
Router.route('/', {
  name: 'dashboard'
});

Router.route('/graph/:_id/editor', {
  name: 'graph.editor',
  template: 'graphEditor',
  subscriptions: function() {
    this.subscribe('knowledgeGraphNodes', this.params._id).wait();
  },
  data: function() {
    var root = Nodes.findOne({ _id: this.params._id });
    if (root) {
      Dependency.get('editorService').init(root);
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
  template: 'geSettings'
});
