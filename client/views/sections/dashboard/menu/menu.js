
var dashboardService;

Dependency.autorun(function() {
  dashboardService = Dependency.get('dashboardService');
});

Template.dMenu.helpers({
  userCanCreateGraph: function() {
    return TALCH.user.hasCreateGraphPermission(Meteor.user());
  }
});

Template.dMenu.events({
  'click #showCreateModal': function() {
    $('#dashboardCreateModal').modal('show');
  },
  'click #showListView': function() {
    dashboardService.view.switch('list');
  },
  'click #showGridView': function() {
    dashboardService.view.switch('grid');
  }
});
