
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
  'focus, keyup .search': function(e, t) {

    // Parent arrow key selection
    if (e.which == 38 || e.which == 40){
      items = t.$('.search-list .list-group-item');
      Template.instance().highlightedResult.set(Template.instance().highlightedResult.get() + e.which - 39);
      items.eq(Template.instance().highlightedResult.get()).mouseenter();
      return false;
    }

    // Enter key handling
    if (e.which == 13){
      t.$('.search-list .list-group-item').eq(Template.instance().highlightedResult.get()).click();
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    // Search for results
    var result = competencyService.nodes.findAllByName(t.$('.search').val(), 20);
    Template.instance().searchResult.set(result);

  },
  'click .show-input': function(e, t) {
    Template.instance().searchDisplay.set(true);
    Template.instance().highlightedResult.set(0);
    setTimeout(function() {
      t.$('.search').focus();
    }, 100);
  },
  'click .list-group-item': function(e, t) {
    var selected = t.data.selected.get();
    selected.push(this);
    t.data.selected.set(selected);
    Template.instance().searchResult.set([]);
    Template.instance().searchDisplay.set(false);
  },

  'mouseover .list-group-item': function(e, t) {
    t.$('.search-list .list-group-item').removeClass('hover');
    t.$(e.currentTarget).addClass('hover');
    Template.instance().highlightedResult.set(t.$(e.currentTarget).index());
  }
});
