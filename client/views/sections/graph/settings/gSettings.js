
var settings;

Dependency.autorun(function() {
  settings = Dependency.get('graphSettingsService');
});

Template.gSettings.helpers({
  root: function() {
    return Template.currentData() && Template.currentData().graphRoot;
  },
  categories: function() {
    return settings.view.categories();
  },
  view: function() {
    return settings.view.current();
  },
  categoryClass: function(view) {
    return settings.view.current() == view ? 'active' : '';
  }
});

Template.gSettings.events({
  'click .graph-settings-item': function() {
    settings.view.switch(this.toString());
  }
});
