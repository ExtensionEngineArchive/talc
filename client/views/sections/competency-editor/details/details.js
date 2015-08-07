
var browserService;

Dependency.autorun(function() {
  browserService = Dependency.get('browserService');
});

Template.ceDetails.helpers({
  node: function() {
    if (browserService.selected()) {
      return Nodes.findOne({ _id: browserService.selected().id });
    } else {
      return { name: '', type: 'C' };
    }
  }
});
