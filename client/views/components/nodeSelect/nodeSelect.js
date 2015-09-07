
var editor;

Dependency.autorun(function() {
  editor = Dependency.get('editorService');
});

Template.nodeSelectComponent.onCreated(function() {
  this.searchResult = new ReactiveVar([]);
});

Template.nodeSelectComponent.helpers({
  searchResult: function() {
    return Template.instance().searchResult.get();
  },
  nodeNumber: function(node) {
    return editor.nodes.number(node._id);
  }
});

Template.nodeSelectComponent.events({
  'input .search': function(e, t) {
    var result = editor.nodes.findAllByName(t.$('.search').val(), 20);
    Template.instance().searchResult.set(result);
  },
  'blur .search': function(e, t) {
    Template.instance().searchResult.set([]);
  },
  'focus .search': function(e, t) {
    Template.instance().searchResult.set(editor.nodes.findAllByName('', 20));
  },
  'mousedown .add': function(e, t) {
    t.data.selected.set(this);
    t.$('.search').val('');
    Template.instance().searchResult.set([]);
  }
});
