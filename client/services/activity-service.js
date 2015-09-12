
// TODO: NTP
Dependency.add('activityService', (function activityService() {
  var s = {};

  var data = {
    graph: new ReactiveVar(null), // Graph being edited (root node)
    users: new ReactiveVar([]),   // Other users that are editing the graph
    nodes: new ReactiveVar([]),   // Nodes being edited (by others)
    inactivityThreshold: 30,      // For detecting inactivity of other users, in seconds
    reportStatusInterval: 20000,  // For reporting activity, in milliseconds (ping)
    markerColors: [
      '#EC407A',                  // Pink
      '#3F51B5',                  // Indigo
      '#9CCC65'                   // Green
    ]
  };

  /**
   * @summary Start activity tracking
   * @method start
   * @param {Object} [graph] Graph (root) node
   */
  s.start = function(graph) {
    if (data.graph.get() != graph) {
      data.graph.set(graph);
      updateStatus();
    }
  };

  /**
   * @summary Stop activity tracking
   * @method stop
   */
  s.stop = function() {
    data.graph.set(null);
  };

  /**
   * @summary Get active users (That are using graph editor)
   * @method users
   * @return {Array}
   */
  s.users = function() {
    return data.users.get();
  };

  /**
   * @summary Update user status (ping)
   * @method updateStatus
   */
  function updateStatus() {
    Meteor.call('activity.graph', data.graph.get());
  }

  /**
   * @summary Retrieve active users
   * @method getActiveUsers
   * @return {Array}
   */
  function getActiveUsers() {
    var users = [];
    var activities = Redis.matching('u::*::g::' + data.graph.get()).fetch();

    if (activities.length > 0) {
      var threshold = new Date();
      threshold.setSeconds(threshold.getSeconds() - data.inactivityThreshold);

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
        ]}).fetch();
    }

    return users;
  }

  /**
   * @summary Set active users
   * @method setActiveUsers
   * @param {Array} [newValue] Active users
   */
  function setActiveUsers(newValue) {
    var oldValue = data.users.curValue;

    // Calculate diff
    var oldValueIds = Lazy(oldValue).pluck('_id');
    var newValueIds = Lazy(newValue).pluck('_id');
    var intersection = Lazy(newValueIds).intersection(oldValueIds).toArray();

    var result = [];
    if ((intersection.length != newValue.length) || (newValue.length != oldValue.length)) {
      Lazy(oldValue).each(function(it) {
        if (Lazy(intersection).contains(it._id)) {
          result.push(it);
        }
      });

      Lazy(newValue).each(function(it) {
        if (!Lazy(oldValueIds).contains(it._id)) {
          result.push({
            _id: it._id,
            profile: it.profile,
            color: data.markerColors[result.length % 3]
          });
        }
      });

      data.users.set(result);
    }
  }

  // Track activities
  Tracker.autorun(function() {
    if (data.graph.get()) {
      setActiveUsers(getActiveUsers());
    }
  });

  // Report status
  setInterval(function() {
    if (data.graph.get()) {
      updateStatus();
    }
  }, data.reportStatusInterval);

  return s;
})());
