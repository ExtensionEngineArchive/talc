
Template.dashboardCreateModal.events({
  'submit #dashboardCreateForm': function(e) {
    e.preventDefault();

    var competency = {
      name: e.target.name.value
    };

    e.target.name.value = '';

    Meteor.call('competencies.insert', competency);

    $('#dashboardCreateModal').modal('hide');
  }
});
