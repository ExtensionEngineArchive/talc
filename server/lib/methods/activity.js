
// TODO: Graph level security
Meteor.methods({
  'activity.graph': function(graphId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var key = 'u::' + Meteor.userId() + '::g::' + graphId;
    Redis.setex(key, 60, new Date());
  },
  'activity.node': function(graphId, nodeId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    // TODO: Optimize
    var previousActivities = 'u::' + Meteor.userId() + '::g::*::n::*';
    Redis.matching(previousActivities).fetch().forEach(function(it) {
      Redis.del(it);
    });

    var key = 'u::' + Meteor.userId() + '::g::' + graphId + '::n::' + nodeId;
    Redis.setex(key, 30, key);
  }
});
