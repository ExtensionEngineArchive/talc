
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.outlineItemComponent.helpers({
  root: function() {
    return Template.instance().data.root;
  },
  children: function() {
    var children = editor.nodes.children(Template.instance().data.root._id).fetch();
    return children.length > 0 ? children : null;
  },
  expand: function() {
    var itemRoot = Template.instance().data.root;
    var graphRoot = editor.context.root();
    return itemRoot._id == graphRoot._id ? 'in' : '';
  }
});
