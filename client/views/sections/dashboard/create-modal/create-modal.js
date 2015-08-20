
Template.dashboardCreateModal.events({
  'submit #dashboardCreateForm': function(e) {
    e.preventDefault();

    var graph = {
      name: e.target.name.value,
      description: e.target.description.value
    };

    e.target.name.value = '';
    e.target.description.value = '';

    Meteor.call('graph.create', graph);

    $('#dashboardCreateModal').modal('hide');
  }
});
