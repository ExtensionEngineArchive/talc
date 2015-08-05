
var competencyService;

Dependency.autorun(function() {
  competencyService = Dependency.get('competencyService');
});

Template.ceNodeModal.onCreated(function() {
  this.tempStorage = {
    parents: new ReactiveVar([]),
    prerequisites: new ReactiveVar([])
  };
});

Template.ceNodeModal.helpers({
  parents: function() {
    return Template.instance().tempStorage.parents;
  }
});

Template.ceNodeModal.events({
  'submit #nodeForm': function(e) {
    e.preventDefault();

    var node = {
      name: e.target.name.value,
      type: 'T'
    };

    e.target.name.value = '';

    competencyService.nodes.add(node, Template.instance().tempStorage.parents.get());
    $('#ceNodeModal').modal('hide');
  }
});
