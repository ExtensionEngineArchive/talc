
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.graphEditor.helpers({
  root: function() {
    return editor.context.root();
  },
  'listView': function() {
    return editor.view.isList();
  },
  'graphView': function() {
    return editor.view.isGraph();
  },
  'outlineView': function() {
    return editor.view.isOutline();
  },
  'renderNodeModal': function() {
    return editor.modals.edit.rendered();
  }
});
