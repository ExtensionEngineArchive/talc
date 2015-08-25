
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.graphEditor.helpers({
  'listView': function() {
    return editor.view.isList();
  },
  'renderNodeModal': function() {
    return editor.modals.edit.rendered();
  }
});
