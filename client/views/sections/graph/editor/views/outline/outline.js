
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.gevOutline.helpers({
  root: function() {
    return editor.context.root();
  }
});
