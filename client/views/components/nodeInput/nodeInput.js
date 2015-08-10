
var competencyService;

Dependency.autorun(function() {
  competencyService = Dependency.get('competencyService');
});

Template.nodeInputComponent.onCreated(function() {
  this.searchResult = new ReactiveVar([]);
  this.searchDisplay = new ReactiveVar(false);
  this.highlightedResult = new ReactiveVar(-1);
});

Template.nodeInputComponent.helpers({
  items: function() {
    return this.selected.get();
  },
  searchResult: function() {
    return Template.instance().searchResult.get();
  },
  searchDisplay: function() {
    return Template.instance().searchDisplay.get();
  }
});

Template.nodeInputComponent.events({
  'input .search': function(e, t) {
    var result = competencyService.nodes.findAllByName(t.$('.search').val(), 20);
    Template.instance().searchResult.set(result);
  },
  'blur .search': function(e, t) {
    Template.instance().searchResult.set([]);
    Template.instance().searchDisplay.set(false);
  },
  'mousedown .show-input': function(e, t) {
    Template.instance().searchDisplay.set(true);
    Template.instance().searchResult.set(competencyService.nodes.findAllByName('', 20));
    setTimeout(function() {
      t.$('.search').focus();
    }, 100);
  },
  'mousedown .add': function(e, t) {
    var selected = t.data.selected.get();
    selected.push(this);
    t.data.selected.set(selected);
    Template.instance().searchResult.set([]);
    Template.instance().searchDisplay.set(false);
  },
  'mousedown .remove': function(e, t) {
    var selected = t.data.selected.get();
    t.data.selected.set(Lazy(selected).without(this).toArray());
  }
});
