
/**
 * Helper class for generating marker color that is used to
 * annotate changes.
 *
 * @class Marker
 */
function Marker() {
  var i = -1;
  var colors = ['#EC407A', '#3F51B5', '#9CCC65'];

  /**
   * @summary Get marker color
   * @method getColor
   * @return {String} Hex color code
   */
  this.getColor = function() {
    i++;
    return colors[i % 3];
  };
}

// TODO: NTP
Dependency.add('activityService', (function activityService() {
  var s = { node: {} };

  var data = {
    graph: new ReactiveVar(null), // Graph being edited (root node)
    users: new ReactiveVar({}),   // Other users that are editing the graph
    nodes: new ReactiveVar({}),   // Nodes being edited (by others)
    inactivityThreshold: 30,      // For detecting inactivity of other users, in seconds
    reportStatusInterval: 20000,  // For reporting activity, in milliseconds (ping)
    marker: new Marker()
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
    return Lazy(data.users.get()).values().toArray();
  };

  /**
   * @summary Report node activity
   * @method node.reportActivity
   * @param {String} [nodeId]
   */
  s.node.reportActivity = function(nodeId) {
    Meteor.call('activity.node', data.graph.curValue, nodeId);
  };

  /**
   * @summary Get node activities
   * @method node.activities
   * @param {String} [nodeId]
   * @return {Array}
   */
  s.node.activities = function(nodeId) {
    var activities = data.nodes.get()[nodeId];
    if (activities) {
      return Lazy(activities).map(function(it) { return data.users.get()[it]; }).toArray();
    } else {
      return [];
    }
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
    var oldValueIds = Lazy(oldValue).keys().toArray();
    var newValueIds = Lazy(newValue).pluck('_id').toArray();
    var intersection = Lazy(newValueIds).intersection(oldValueIds).toArray();

    var result = {};
    if ((intersection.length != newValueIds.length) || (newValueIds.length != oldValueIds.length)) {
      Lazy(oldValue).each(function(v, k) {
        if (Lazy(intersection).contains(k)) {
          result[k] = v;
        }
      });

      Lazy(newValue).each(function(it) {
        if (!Lazy(oldValueIds).contains(it._id)) {
          result[it._id] = {
            _id: it._id,
            profile: it.profile,
            color: data.marker.getColor()
          };
        }
      });

      data.users.set(result);
    }
  }

  /**
   * @summary Retrieve nodes that are being edited
   * @method getNodesWithActivity
   * @return {Object}
   */
  function getNodesWithActivity() {
    var nodes = {};
    var activities = Redis.matching('u::*::g::' + data.graph.get() + '::n::*').fetch();

    if (activities.length > 0) {
      var threshold = new Date();
      threshold.setSeconds(threshold.getSeconds() - 10);

      Lazy(activities).each(function(it) {
        it.value = new Date(it.value);
        if (it.value > threshold) {
          var userId = it.key.split('::')[1];
          if (userId != Meteor.userId()) {
            var nodeId = it.key.split('::')[5];
            if (nodes[nodeId]) {
              nodes[nodeId].push(userId);
            } else {
              nodes[nodeId] = [userId];
            }
          }
        }
      });
    }

    return nodes;
  }

  // Track activities
  Tracker.autorun(function() {
    if (data.graph.get()) {
      setActiveUsers(getActiveUsers());
      data.nodes.set(getNodesWithActivity());
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
