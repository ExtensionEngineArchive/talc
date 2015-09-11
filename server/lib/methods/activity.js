
Meteor.methods({
  'activity.graph': function(graphId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Redis.set('user::' + Meteor.userId() + '::graph::' + graphId, new Date());
  }
});
