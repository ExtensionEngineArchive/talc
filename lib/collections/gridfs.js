
var fileStore = new FS.Store.GridFS("files", { maxTries: 3 });

Files = new FS.Collection("files", {
  stores: [fileStore]
});
