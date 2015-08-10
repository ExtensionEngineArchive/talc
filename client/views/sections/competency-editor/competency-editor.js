
var editorService;

Dependency.autorun(function() {
  editorService = Dependency.get('editorService');
});

Template.competencyEditor.helpers({
  'listView': function() {
    return editorService.view.isList();
  }
});
