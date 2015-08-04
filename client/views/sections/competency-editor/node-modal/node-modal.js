
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
