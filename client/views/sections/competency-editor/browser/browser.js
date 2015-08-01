
Template.ceBrowser.helpers({
  root: function() {
    var browser = Session.get('ceBrowser');
    var root = browser.path[browser.path.length-1];
    return root;
  },
  parent: function() {
    var browser = Session.get('ceBrowser');
    
    if (browser.path.length > 1) {
      var parent = browser.path[browser.path.length-2];
      return parent;
    }
  },
  items: function() {
    var browser = Session.get('ceBrowser');
    var root = browser.path[browser.path.length-1];
    return Nodes.find({
      _id : {
        $in : Competencies.getChildren(Template.currentData().graph, root.id)
      }
    });
  }
});

Template.ceBrowser.events({
  'click .navigate-forward': function() {
    var browser = Session.get('ceBrowser');

    browser.path.push({
      id: this._id,
      name: this.name,
      type: this.type
    });

    Session.set('ceBrowser', browser);
  },
  'click .navigate-backward': function() {
    var browser = Session.get('ceBrowser');
    browser.path.pop();
    Session.set('ceBrowser', browser);
  }
});
