
var browserService;

Dependency.autorun(function() {
  browserService = Dependency.get('browserService');
});

Template.ceDetails.helpers({
  node: function() {
    return browserService.root();
  }
});
