
Comments = new Mongo.Collection('comments');

var schema = new SimpleSchema({
  text: {
    type: String,
    label: "Comment",
    max: 2000
  },
  graphId: {
    type: String
  },
  nodeId: {
    type: String
  },
  userId: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

Comments.attachSchema(schema);
