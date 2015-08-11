
var browserService;
var editorService;

Dependency.autorun(function() {
  browserService = Dependency.get('browserService');
  editorService = Dependency.get('editorService');
});

Template.ceBrowser.helpers({
  path: function() {
    return browserService.path();
  },
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
          $in : Nodes.getChildren(Template.currentData().graph, browserService.root()._id)
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
    browserService.back(this);
  },
  'click .browser-card': function() {
    editorService.context.select(this);
  }
});
