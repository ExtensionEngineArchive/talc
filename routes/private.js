
Router.route('/:_id/competency-editor', function() {
  this.render('competencyEditor', {
    data: function() {
      var competency = Competencies.findOne({_id: this.params._id});
      return { competency: competency };
    }
  });
}, {
  name: 'competency-editor'
});
