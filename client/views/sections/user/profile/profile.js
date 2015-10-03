
Template.uProfile.helpers({
  avatarOptions: function() {
    var avatar = Avatars.findOne(Template.currentData().user.profile.photo);
    if (avatar) {
      var temp = new Image();
      temp.src = avatar.url();
      avatar = temp;
    }

    return {
      photo: avatar,
      loadImage: {
        maxWidth: 128,
        maxHeight: 128,
        crop: true
      },
      showClear: true,
      callback: function(error, photo) {
        if (error) {
          // TODO: Implement error handling
          console.error(error);
          return;
        }

        Avatars.insert(photo.src, function(error, persistedPhoto) {
          if (error) {
            // TODO: Implement error handling
            console.error(error);
          } else {
            Meteor.call('users.profile.update', { photo: persistedPhoto._id });
          }
        });
      }
    };
  },
  avatar: function() {
    if (Template.currentData().user && Template.currentData().user.profile) {
      return Avatars.findOne(Template.currentData().user.profile.photo);
    }
  }
});
