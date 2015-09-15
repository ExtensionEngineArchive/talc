
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.gsGeneral.helpers({
  root: function() {
    var parentContext = Template.parentData(1);
    return parentContext && parentContext.graphRoot || {};
  }
});
