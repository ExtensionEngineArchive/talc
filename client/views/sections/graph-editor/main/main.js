
var editorService;

Dependency.autorun(function() {
  editorService = Dependency.get('editorService');
});

Template.geMain.helpers({
  'node': function() {
    return editorService.context.selected.group();
  },
  'skills': function() {
    if (editorService.context.root()) {
      return Nodes.find({
        _id : {
          $in : Nodes.getSkills(editorService.context.graph(), editorService.context.selected.group()._id)
        }
      });
    }
  }
});

Template.geMain.events({
  'click .ce-main .skill': function() {
    editorService.context.select(this);
  }
});
