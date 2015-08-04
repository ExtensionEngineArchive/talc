
Template.dCatalog.helpers({
  competencies: function() {
    return Nodes.find({ type: 'C' });
  }
});
