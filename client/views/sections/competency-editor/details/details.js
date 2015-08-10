
var competencyService;
var editorService;

Dependency.autorun(function() {
  competencyService = Dependency.get('competencyService');
  editorService = Dependency.get('editorService');
});

Template.ceDetails.helpers({
  node: function() {
    var node = editorService.context.selected.node();

    if (node) {
      return node;
    }

    return { name: '', type: 'C' };
  },
  parents: function() {
    var node = editorService.context.selected.node();
    if (node) {
      var parentIds = Nodes.getParents(competencyService.graph(), node._id);
      if (parentIds && parentIds.length > 0) {
        return Nodes.find({
          _id : {
            $in : parentIds
          }
        });
      }
    }

    return [];
  }
});
