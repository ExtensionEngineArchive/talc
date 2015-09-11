
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

    updateUsers(users);
  }

  function updateUsers(newValue) {
    var oldValue = Lazy(data.users.get()).pluck('_id');
    var intersection = Lazy(Lazy(newValue).pluck('_id')).intersection(oldValue).toArray();

    var colors = [
      '#F44236', '#EA1E63', '#9C28B1', '#673BB7', '#3F51B5',
      '#FFEB3C', '#FF9700', '#FE5722', '#9E9E9E', '#607D8B'
    ];

    if (intersection.length != newValue.length) {
      var result = [];
      Lazy(oldValue).each(function(it) {
        if (Lazy(intersection).contains(it._id)) {
          result.push(it);
        }
      });

      Lazy(newValue).each(function(it) {
        if (!Lazy(oldValue).contains(it._id)) {
          result.push({ _id: it._id, profile: it.profile, color: colors[Math.floor(Math.random() * 10)] });
        }
      });

      data.users.set(result);
    }
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
  }, 30000);

  return s;
})());
