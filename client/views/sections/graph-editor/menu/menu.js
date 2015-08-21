
var editorService;

Dependency.autorun(function() {
  editorService = Dependency.get('editorService');
});

Template.geMenu.helpers({
  graph: function() {
    return editorService.context.root();
  },
  userIsAdmin: function() {
    return TALCH.user.isGraphAdmin(Meteor.user(), editorService.context.root()._id);
  }
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
