
Dependency.add('activityService', (function activityService() {
  var s = {};

  var data = {
    graph: new ReactiveVar(null),
    users: new ReactiveVar([]),
    nodes: new ReactiveVar([]),
    threshold: 30
  };

  s.start = function(graph) {
    if (data.graph.get() != graph) {
      data.graph.set(graph);
      update();
    }
  };

  s.stop = function() {
    data.graph.set(null);
  };

  s.users = function() {
    return data.users.get();
  };

  function update() {
    Meteor.call('activity.graph', data.graph.get());
  }

  function getUsers() {
    var users = [];
    var activities = Redis.matching('user::*::graph::' + data.graph.get()).fetch();

    if (activities.length > 0) {
      var threshold = new Date();
      threshold.setSeconds(threshold.getSeconds() - data.threshold);

      Lazy(activities).each(function(it) {
        it.value = new Date(it.value);
        if (it.value > threshold) {
          var userId = it.key.split('::')[1];
          if (userId != Meteor.userId()) {
            users.push(userId);
          }
        }
      });

      users = Meteor.users.find({
        $and: [
          { _id: { $in: users } },
          { 'status.online': true }
        ]
      }).fetch();
    }

    data.users.set(users);
  }

  // Track
  Tracker.autorun(function() {
    if (data.graph.get()) {
      getUsers();
    }
  });

  // Ping
  setInterval(function() {
    if (data.graph.get()) {
      update();
    }
  }, data.threshold);

  return s;
})());
