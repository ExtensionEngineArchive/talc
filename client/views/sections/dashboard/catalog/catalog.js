
var dashboardService;

Dependency.autorun(function() {
  dashboardService = Dependency.get('dashboardService');
});

Template.dCatalog.onCreated(function() {
  this.search = new ReactiveVar('');
});

Template.dCatalog.helpers({
  knowledgeGraphs: function() {
    if (Template.instance().search.get()) {
      return Nodes.find({
        $and: [
          { type: 'R' },
          { name: new RegExp('^' + Template.instance().search.get().toLowerCase(), 'i') }
        ]});
    } else {
      return Nodes.find({ type: 'R' });
    }
  },
  view: function() {
    return dashboardService.view.current();
  }
});

Template.dCatalog.events({
  'input #catalogSearch': function(e, t) {
    Template.instance().search.set(t.$('#catalogSearch').val());
  }
});
