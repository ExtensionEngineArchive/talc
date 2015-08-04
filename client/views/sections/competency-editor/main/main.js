
var browserService;

Dependency.autorun(function() {
  browserService = Dependency.get('browserService');
});

Template.ceMain.helpers({
  'skills': function() {
    if (Template.currentData() && Template.currentData().competency) {
      return Nodes.find({
        _id : {
          $in : Nodes.getSkills(Template.currentData().graph, browserService.root().id)
        }
      });
    }
  }
});
