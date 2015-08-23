
Template.dCatalog.helpers({
  knowledgeGraphs: function() {
    return Nodes.find({ type: 'R' });
  }
});
