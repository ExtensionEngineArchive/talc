
var browserService;

Dependency.autorun(function() {
  browserService = Dependency.get('browserService');
});

Dependency.add('competencyService', (function competencyService() {
  var s = {
    context: {},
    nodes: {}
  };

  var data = {
    competency: new ReactiveVar(''),
    graph: new ReactiveVar('')
  };

  s.init = function(competency) {
    data.competency.set(competency);
    data.graph.set(cytoscape({ elements: competency.elements }));
    browserService.init(data.competency.get());
  };

  s.context.competency = function() {
    return data.competency.get();
  };

  s.context.graph = function() {
    return data.graph.get();
  };

  s.nodes.ids = function(graph) {
    var result = [];
    graph = graph || s.context.graph();

    graph.nodes().forEach(function(it) {
      result.push(it.id());
    });

    return result;
  };

  s.nodes.add = function(node, parents) {
    parents = parents || [s.context.competency()];

    Meteor.call('nodes.insert', node, function(error, _id) {
      var params = {
        competency: s.context.competency(),
        node: Nodes.findOne({ _id: _id }),
        parents: parents
      };

      Meteor.call('competencies.node.add', params);
    });
  };

  s.nodes.findAllByName = function(search, limit) {
    limit = limit || 30;
    return Nodes.find({
      $and: [
        { _id: { $in: s.nodes.ids() } },
        { name: new RegExp(search) }
      ]}, { limit: limit }).fetch();
  };

  return s;
})());
