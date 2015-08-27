
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.geNodeModal.onCreated(function() {
  var node = editor.modals.edit.node();
  if (node) {
    this.storage = {
      _id: node._id,
      name: node.name,
      types: getTypes(node.type),
      selected: new ReactiveVar(),
      create: false
    };
  } else {
    this.storage = {
      name: '',
      types: getTypes(),
      parents: new ReactiveVar([]),
      selected: new ReactiveVar(),
      create: true
    };
  }
});

Template.geNodeModal.helpers({
  name: function() {
    return Template.instance().storage.name;
  },
  types: function() {
    return Template.instance().storage.types;
  },
  parents: function() {
    var t = Template.instance();
    var selected = t.storage.selected;

    if (selected.get() && t.storage.create) {
      var temp = t.storage.parents.get();
      temp.push(selected.get());
      t.storage.parents.set(temp);
      selected.set(null);
    } else if (selected.get() && !t.storage.create) {
      editor.nodes.parent.add(t.storage._id, selected.get()._id);
      selected.set(null);
    }

    return t.storage.create ? t.storage.parents.get() : editor.nodes.parents(t.storage._id);
  },
  selected: function() {
    return Template.instance().storage.selected;
  },
  create: function() {
    return Template.instance().storage.create;
  }
});

Template.geNodeModal.events({
  'submit #nodeForm': function(e, t) {
    e.preventDefault();

    var node = {
      name: e.target.name.value,
      type: e.target.type.value
    };

    editor.nodes.add(node, t.storage.parents.get());
    $('#ceNodeModal').modal('hide');
  },
  'mousedown .remove': function(e, t) {
    if (t.storage.create) {
      t.storage.parents.set(Lazy(t.storage.parents.get()).without(this).toArray());
    } else {
      editor.nodes.parent.remove(t.storage._id, this._id);
    }
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
