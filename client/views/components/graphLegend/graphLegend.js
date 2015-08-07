Template.graphLegendComponent.helpers({
  items: function () {
    var results = [];

    Lazy(Nodes.TYPE.list).each(function (it) {
      results.push({
        type: it,
        name: Nodes.TYPE[it].name
      });
    });
    
    return results;
  }
});
