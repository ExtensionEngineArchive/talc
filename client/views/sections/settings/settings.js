
var settings;

Dependency.autorun(function() {
  settings = Dependency.get('settingsService');
});

Template.settings.helpers({
  categories: function() {
    return settings.view.categories();
  },
  view: function() {
    return settings.view.current();
  },
  categoryClass: function(view) {
    return settings.view.current() === view ? 'active' : '';
  }
});

Template.settings.events({
  'click .settings-item': function() {
    settings.view.switch(this.toString());
  }
});
