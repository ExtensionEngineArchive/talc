
// --------------------------------------------------------------------
// Node comments
// --------------------------------------------------------------------

Meteor.methods({
  'comments.post': function(params) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var user = Meteor.user();
    if (!TALCH.graph.hasAccess(user, params.graphId)) {
      throw new Meteor.Error("not-authorized");
    }

    var _id = Comments.insert({
      text: params.text,
      graphId: params.graphId,
      nodeId: params.nodeId,
      userId: user._id,
      createdAt: new Date()
    });
  }
});
