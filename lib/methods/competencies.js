
Meteor.methods({
  competencies: {
    insert: function(params) {
      Competencies.insert({
        name: params.name,
        createdAt: new Date()
      });
    },
    update: function(params) {
      Competencies.update(params._id, {
        $set: {
          name: params.name
        }
      });
    },
    delete: function(_id) {
      Competencies.delete(_id);
    }
  }
});
