
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.geDetails.helpers({
  node: function() {
    var node = editor.context.selected.node();
    return node || { name: '', type: 'R' };
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
  },
  comments: function() {
    return Comments.find({ nodeId: editor.context.selected.node()._id });
  },
  user: function(_id) {
    var user = Meteor.users.findOne({ _id: _id });
    return user.profile.firstName + ' ' + user.profile.lastName;
  }
});

Template.geDetails.events({
  'click .zmdi-edit': function() {
    editor.modals.edit.update(editor.context.selected.node());
  },
  'click .zmdi-delete': function() {
    editor.nodes.remove(editor.context.selected.node()._id);
  },
  'submit': function(e, t) {
    e.preventDefault();

    var params = {
      text: e.target.comment.value,
      graphId: editor.context.root()._id,
      nodeId: editor.context.selected.node()._id
    };

    Meteor.call('comments.post', params);

    e.target.comment.value = '';
  }
});
