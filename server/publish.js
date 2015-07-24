
// TODO: Publish user related competencies
Meteor.publish("allCompetencies", function() {
  return Competencies.find();
});
