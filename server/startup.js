
Meteor.startup(function() {
  Competencies.remove({});
  Competencies.insert({ name: 'Competency A' });
  Competencies.insert({ name: 'Competency B' });
  Competencies.insert({ name: 'Competency C' });
  Competencies.insert({ name: 'Competency D' });
});
