
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.outlineItemComponent.onCreated(function() {
  this.showNodeInput = new ReactiveVar(false);
});

Template.outlineItemComponent.helpers({
  root: function() {
    return Template.instance().data.root;
  },
  children: function() {
    var children = editor.nodes.children(Template.instance().data.root._id).fetch();
    return children.length > 0 ? children : null;
  },
  'nodeType': function(node) {
    return Nodes.TYPE[node.type].code;
  },
  'nodeColor': function(node) {
    return Nodes.TYPE[node.type].color;
  },
  nodeNumber: function(node) {
    return editor.nodes.number(node._id);
  },
  childTypes: function(node) {
    var results = [];
    var types = [];

    if ((node.type == 'R') || (node.type == 'T')) {
      types = ['T', 'O'];
    } else if (node.type == 'O') {
      types = ['S'];
    } else {
      return [];
    }

    Lazy(Nodes.TYPE.list).each(function (it) {
      if (Lazy(types).contains(it)) {
        results.push({
          code: Nodes.TYPE[it].code,
          name: Nodes.TYPE[it].name,
          color: Nodes.TYPE[it].color
        });
      }
    });

    return results;
  },
  showNodeInput: function() {
    return Template.instance().showNodeInput.get();
  }
});

Template.outlineItemComponent.events({
  'click .panel-title': function(e, t) {
    editor.select(this.root);
    t.$('.panel-heading').removeClass('node-selected');
    t.$('#heading' + this.root._id).addClass('node-selected');
  },
  'click .add-node': function(e, t) {
    e.preventDefault();

    var node = {
      name: t.$('[name=name]').val(),
      type: t.$('[name=type]').val()
    };

    editor.nodes.add(node, [this.root]);
    Template.instance().showNodeInput.set(false);
    return false;
  },
  'click .show-node-input': function() {
    Template.instance().showNodeInput.set(true);
    return false;
  }
});
