
var browser;
var editor;

Dependency.autorun(function() {
  browser = Dependency.get('browserService');
  editor = Dependency.get('editorService');
});

Template.gevmBrowser.helpers({
  path: function() {
    return browser.path();
  },
  root: function() {
    return Nodes.findOne({ _id: browser.root()._id });
  },
  items: function() {
    return browser.items();
  },
  total: function() {
    return browser.items().length;
  },
  nodeClass: function(node) {
    return browser.root()._id == node._id ? 'active' : '';
  },
  nodeNumber: function(node) {
    return editor.nodes.number(node._id);
  }
});

Template.gevmBrowser.events({
  'click .navigate-forward': function() {
    if (this.type === 'T') {
      browser.forward(this);
    }
  },
  'click .navigate-backward': function() {
    browser.back(this);
  },
  'click .browser-card': function() {
    editor.select(this);
  }
});
