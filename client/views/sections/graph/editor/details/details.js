
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.geDetails.helpers({
  node: function() {
    var node = editor.context.selected.node();
    return node || { name: '', type: 'C' };
  },
  parents: function() {
    var node = editor.context.selected.node();
    if (node) {
      var parentIds = Nodes.getParents(editor.context.graph(), node._id);
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
