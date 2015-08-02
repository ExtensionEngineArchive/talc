
var browserService;

Dependency.autorun(function() {
  browserService = Dependency.get('browserService');
});

Template.ceBrowser.helpers({
  root: function() {
    return browserService.root();
  },
  parent: function() {
    return browserService.parent();
  },
  items: function() {
    return Nodes.find({
      _id : {
        $in : Competencies.getChildren(Template.currentData().graph, browserService.root().id)
      }
    });
  }
});

Template.ceBrowser.events({
  'click .navigate-forward': function() {
    browserService.forward(this);
  },
  'click .navigate-backward': function() {
    browserService.back();
  }
});
