
Router.route('/', {
  name: 'dashboard'
});

Router.route('/:_id/graph-editor', {
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
    } else {
      this.render('Loader');
    }
  }
});
