
var editorService;

Dependency.autorun(function() {
  editorService = Dependency.get('editorService');
});

Template.ceMain.helpers({
  'node': function() {
    return editorService.context.selected.group();
  },
  'skills': function() {
    if (Template.currentData() && Template.currentData().competency) {
      return Nodes.find({
        _id : {
          $in : Nodes.getSkills(Template.currentData().graph, editorService.context.selected.group()._id)
        }
      });
    }
  }
});

Template.ceMain.events({
  'click .ce-main .skill': function() {
    editorService.context.select(this);
  }
});
