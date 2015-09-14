
var editorService;
var activityService;

Dependency.autorun(function() {
  editorService = Dependency.get('editorService');
  activityService = Dependency.get('activityService');
});

Template.gevmSkills.onRendered(function() {
  $('.skill .editable-text').unbind('click');
  $('.skill .editable-text').on('click', function() {
    $(this).parent().click();
  });
});

Template.gevmSkills.helpers({
  'node': function() {
    return editorService.context.selected.group();
  },
  'skills': function() {
    if (editorService.context.root()) {
      return Nodes.find({
        _id : {
          $in : Nodes.getSkills(editorService.context.graph(), editorService.context.selected.group()._id)
        }
      }, { sort: { createdAt: 1 } });
    }
  },
  nodeNumber: function(node) {
    return editorService.nodes.number(node._id);
  },
  activityMarker: function(nodeId) {
    var activities = activityService.node.activities(nodeId);
    return activities.length > 0 ? ('background-color: ' + activities[0].color) : '';
  }
});

Template.gevmSkills.events({
  'click .ce-main .skill': function(e, t) {
    editorService.select(this);
    t.$('.ce-main .skill').removeClass('active');
    t.$('#skill' + editorService.context.selected.node()._id).addClass('active');
  }
});
