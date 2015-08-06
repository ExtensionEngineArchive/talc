
var competencyService;

Dependency.autorun(function() {
  competencyService = Dependency.get('competencyService');
});

Template.ceMenu.events({
  'click #createNode': function() {
    $('#ceNodeModal').modal('show');
  },
  'click #showGraph': function() {
    competencyService.editor.view.switchToGraph();
  },
  'click #showList': function() {
    competencyService.editor.view.switchToList();
  }
});
