Router.route('/:_id/competency-editor', function() {
  this.render('competencyEditor', {
    data: function() {
      var competency = Competencies.findOne({ _id: this.params._id });
      if (competency) {
        var browserService = Dependency.get('browserService');
        browserService.init(competency);

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
