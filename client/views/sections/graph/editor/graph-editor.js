
var editor;
var visualisation;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
  visualisation = Dependency.get('visualisationService');
});

Template.graphEditor.helpers({
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

Template.graphEditor.events({
  'click .graph-switch-layout': function(e) {
    var layout = e.currentTarget.id;
    layout = layout.replace(/show|Layout/g,'').toLowerCase();
    visualisation.editor.setKnowledgeGraphLayout(layout);
  }
});
