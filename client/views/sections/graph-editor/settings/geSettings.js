
var settings;

Dependency.autorun(function() {
  settings = Dependency.get('graphSettingsService');
});

Template.geSettings.helpers({
  categories: function() {
    return settings.view.categories();
  },
  view: function() {
    return settings.view.current();
  }
});

Template.geSettings.events({
  'click .graph-settings-item': function() {
    settings.view.switch(this.toString());
  }
});
