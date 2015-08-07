
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
    if (Template.currentData() && Template.currentData().competency) {
      return Nodes.find({
        _id : {
          $in : Nodes.getChildren(Template.currentData().graph, browserService.root().id)
        }
      });
    }
  }
});

Template.ceBrowser.events({
  'click .navigate-forward': function() {
    if (this.type === 'T') {
      browserService.forward(this);
    }
  },
  'click .navigate-backward': function() {
    browserService.back();
  },
  'click .browser-card': function() {
    browserService.select(this);
  }
});
