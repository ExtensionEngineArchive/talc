
var editorService;

Dependency.autorun(function() {
  editorService = Dependency.get('editorService');
});

Template.geMenu.events({
  'click #createNode': function() {
    $('#ceNodeModal').modal('show');
  },
  'click #showGraph': function() {
    editorService.view.switchToGraph();
  },
  'click #showList': function() {
    editorService.view.switchToList();
  }
});
