
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

  'keydown .search': function(e, t) {
    // Arrow keys suggestion traversal
    if (e.which == 38 || e.which == 40){
      t.highlightedResult.set(t.highlightedResult.get() + e.which - 39);
      items = t.$('.search-list .list-group-item');
      items.eq(t.highlightedResult.get()).mouseenter();
      return false;
    }

    // Adding via 'enter' key
    if (e.which == 13){
      t.$('.search-list .list-group-item').eq(t.highlightedResult.get()).trigger('mousedown');
      resetSearchState();
      return false;
    }

    // Do search
    var result = competencyService.nodes.findAllByName(t.$('.search').val(), 20);
    Template.instance().searchResult.set(result);
  },
  'blur .search': function(e, t) {
    resetSearchState();
  },
  'mousedown .show-input': function(e, t) {
    Template.instance().searchDisplay.set(true);
    Template.instance().searchResult.set(competencyService.nodes.findAllByName('', 20));
    setTimeout(function() {
      t.$('.search').focus();
    }, 100);
  },
  'mousedown .search-list .list-group-item': function(e, t) {
    var selected = t.data.selected.get();
    selected.push(this);
    t.data.selected.set(selected);
    resetSearchState();
    return false;
  },
  'mousedown .remove': function(e, t) {
    var selected = t.data.selected.get();
    t.data.selected.set(Lazy(selected).without(this).toArray());
  },
  'mouseover .list-group-item': function(e, t) {
    t.$('.search-list .list-group-item').removeClass('hover');
    t.$(e.currentTarget).addClass('hover');
    t.highlightedResult.set(t.$(e.currentTarget).index());
  }
});

// Auxiliary functions
var resetSearchState = function(){
  Template.instance().searchResult.set([]);
  Template.instance().searchDisplay.set(false);
  Template.instance().highlightedResult.set(-1);
}
