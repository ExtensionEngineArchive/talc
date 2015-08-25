
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.geNodeModal.onCreated(function() {
  var node = editor.modals.edit.node();
  if (node) {
    this.tempStorage = {
      name: node.name,
      types: getTypes(node.type),
      parents: new ReactiveVar(editor.nodes.parents(node._id))
    };
  } else {
    this.tempStorage = {
      name: '',
      types: getTypes(),
      parents: new ReactiveVar([])
    };
  }
});

Template.geNodeModal.helpers({
  name: function() {
    return Template.instance().tempStorage.name;
  },
  types: function() {
    return Template.instance().tempStorage.types;
  },
  parents: function() {
    return Template.instance().tempStorage.parents;
  }
});

Template.geNodeModal.events({
  'submit #nodeForm': function(e, t) {
    e.preventDefault();

    var node = {
      name: e.target.name.value,
      type: e.target.type.value
    };

    editor.nodes.add(node, Template.instance().tempStorage.parents.get());
    $('#ceNodeModal').modal('hide');
  }
});

function getTypes(type) {
  var result = [];
  type = type || 'T';

  Lazy(['T', 'O', 'S']).each(function(it) {
    result.push({
      name: Nodes.TYPE[it].name,
      type: it,
      checked: it === type ? true : false
    });
  });

  return result;
}
