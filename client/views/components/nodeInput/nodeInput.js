
var competencyService;

Dependency.autorun(function() {
  competencyService = Dependency.get('competencyService');
});

Template.nodeInputComponent.onCreated(function() {
  this.searchResult = new ReactiveVar([]);
  this.searchDisplay = new ReactiveVar(false);
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
  'focus, keyup .search': function(e, t) {
    var result = competencyService.nodes.findAllByName(t.$('.search').val(), 20);
    Template.instance().searchResult.set(result);
  },
  'focusout .search': function() {
    Template.instance().searchResult.set([]);
    Template.instance().searchDisplay.set(false);
  },
  'click .show-input': function(e, t) {
    Template.instance().searchDisplay.set(true);
    setTimeout(function() {
      t.$('.search').focus();
    }, 100);
  },
  'click .add': function(e, t) {
    var selected = t.data.selected.get();
    selected.push(this);
    t.data.selected.set(selected);
    Template.instance().searchResult.set([]);
    Template.instance().searchDisplay.set(false);
  }
});
