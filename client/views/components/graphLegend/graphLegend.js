
Template.graphLegendComponent.helpers({
  items: function () {
    var results = [];
    Lazy(Nodes.TYPE.list).each(function (it) {
      results.push({
        code: Nodes.TYPE[it].code,
        name: Nodes.TYPE[it].name,
        color: Nodes.TYPE[it].color
      });
    });

    return results;
  }
});
