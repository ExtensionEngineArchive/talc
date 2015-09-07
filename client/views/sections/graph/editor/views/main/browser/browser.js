
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
    return browser.root();
  },
  topics: function() {
    var result = [];
    if (browser.items()) {
      var topics = Lazy(browser.items()).groupBy('type').toObject().T;
      result = topics ? topics : [];
    }

    return result;
  },
  objectives: function() {
    var result = [];
    if (browser.items()) {
      var objectives = Lazy(browser.items()).groupBy('type').toObject().O;
      result = objectives ? objectives : [];
    }

    return result;
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
