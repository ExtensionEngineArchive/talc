
var avatarStore = new FS.Store.GridFS("avatars", { maxTries: 3 });

Avatars = new FS.Collection("avatars", {
  stores: [avatarStore]
});
