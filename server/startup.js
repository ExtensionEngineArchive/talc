
Meteor.startup(function() {
  // Uncomment to delete existing nodes
  // Competencies.remove({});

  if (!Competencies.findOne()) {
    Competencies.insert({ name: 'Competency A' });
    Competencies.insert({ name: 'Competency B' });
    Competencies.insert({ name: 'Competency C' });
    Competencies.insert({ name: 'Competency D' });
  }
});
