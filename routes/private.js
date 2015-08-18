
Router.route('/', {
  name: 'dashboard'
});

Router.route('/:_id/graph-editor', function() {
  this.render('graphEditor', {
    data: function() {
      var competency = Nodes.findOne({ _id: this.params._id });
      if (competency) {
        Dependency.get('editorService').init(competency);

        return {
          competency: competency,
          graph: cytoscape({ elements: competency.elements })
        };
      }
    }
  });
}, {
  name: 'competency-editor'
});
