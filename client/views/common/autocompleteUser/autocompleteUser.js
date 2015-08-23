
Template.autocompleteUser.helpers({
  email: function() {
    return this.emails[0].address;
  },
  status: function() {
    return (this.status.online ? 'success' : 'danger');
  }
});
