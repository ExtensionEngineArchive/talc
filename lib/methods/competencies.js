
Meteor.methods({
  'competencies.insert': function(params) {
    Competencies.insert({
      name: params.name
    });
  },
  'competencies.update': function(params) {
    Competencies.update(params._id, {
      $set: {
        name: params.name
      }
    });
  },
  'competencies.delete': function(_id) {
    Competencies.delete(_id);
  }
});
