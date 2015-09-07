
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.gsGeneral.helpers({
  root: function() {
    return Template.parentData(1).graphRoot || {};
  }
});
