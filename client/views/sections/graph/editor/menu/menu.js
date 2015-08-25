
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.geMenu.helpers({
  graph: function() {
    return editor.context.root();
  },
  userIsAdmin: function() {
    return TALCH.user.isGraphAdmin(Meteor.user(), editor.context.root()._id);
  }
});

Template.geMenu.events({
  'click #createNode': function() {
    editor.modals.edit.new();
  },
  'click #showGraph': function() {
    editor.view.switchToGraph();
  },
  'click #showList': function() {
    editor.view.switchToList();
  }
});
