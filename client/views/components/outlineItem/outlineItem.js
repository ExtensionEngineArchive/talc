
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
  },
  'nodeType': function(node) {
    return Nodes.TYPE[node.type].code;
  },
  'nodeColor': function(node) {
    return Nodes.TYPE[node.type].color;
  },
  nodeNumber: function(node) {
    return editor.nodes.number(node._id);
  }
});

Template.outlineItemComponent.events({
  'click .panel-title': function(e, t) {
    editor.select(this.root);
    t.$('.panel-heading').removeClass('node-selected');
    t.$('#heading' + this.root._id).addClass('node-selected');
  }
});
