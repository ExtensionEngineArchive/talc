
Template.dashboardCreateModal.events({
  'submit #dashboardCreateForm': function(e) {
    e.preventDefault();

    var competency = {
      name: e.target.name.value,
      description: e.target.description.value
    };

    e.target.name.value = '';
    e.target.description.value = '';

    Meteor.call('competencies.insert', competency);

    $('#dashboardCreateModal').modal('hide');
  }
});
