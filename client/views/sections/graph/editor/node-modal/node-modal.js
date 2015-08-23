
var editorService;

Dependency.autorun(function() {
  editorService = Dependency.get('editorService');
});

Template.geNodeModal.onCreated(function() {
  this.tempStorage = {
    parents: new ReactiveVar([]),
    prerequisites: new ReactiveVar([])
  };
});

Template.geNodeModal.helpers({
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

    editorService.nodes.add(node, Template.instance().tempStorage.parents.get());

    e.target.name.value = '';
    e.target.type.value = 'T';
    Template.instance().tempStorage.parents.set([]);

    $('#ceNodeModal').modal('hide');
  }
});
