
Router.route('/:_id/competency-editor', function() {
  this.render('competencyEditor', {
    data: function() {
      var competency = Competencies.findOne({ _id: this.params._id });
      var browser = Session.get('ceBrowser') || {};

      if (!browser.path || (browser.path[0].id !== competency._id)) {
        browser.path = [];
        browser.path.push({
          id: competency._id,
          name: competency.name,
          type: 'C'
        });
      }

      Session.set('ceCompetency', competency);
      Session.set('ceBrowser', browser);

      return {
        competency: competency,
        graph: cytoscape({ elements: competency.elements })
      };
    }
  });
}, {
  name: 'competency-editor'
});
