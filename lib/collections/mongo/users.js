
var schema = {};

schema.profile = new SimpleSchema({
  firstName: {
    type: String,
    regEx: /^[a-zA-Z-]{2,25}$/,
    optional: true
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z]{2,25}$/,
    optional: true
  },
  photo: {
    type: String,
    optional: true
  }
});

schema.user = new SimpleSchema({
  emails: {
    type: [Object]
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  profile: {
    type: schema.profile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  status: {
    type: Object,
    optional: true,
    blackbox: true
  },
  createdAt: {
    type: Date
  }
});

Meteor.users.attachSchema(schema.user);
