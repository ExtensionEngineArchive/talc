Template.graphLegendComponent.helpers({
  nodeTypes: function () {
    return Lazy(Nodes.TYPE).omit('list').values().toArray();
  }
});
