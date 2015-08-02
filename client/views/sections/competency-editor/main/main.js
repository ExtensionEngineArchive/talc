
var browserService;

Dependency.autorun(function() {
  browserService = Dependency.get('browserService');
});

Template.ceMain.helpers({
  'skills': function() {
    if (Template.currentData() && Template.currentData().competency) {
      return Nodes.find({
        _id : {
          $in : Competencies.getSkills(Template.currentData().graph, browserService.root().id)
        }
      });
    }
  }
});
