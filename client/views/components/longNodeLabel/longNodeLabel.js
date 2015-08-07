Template.longNodeLabelComponent.helpers({
  color: function(type) {
    return Nodes.TYPE[type].color;
  },
  fullName: function (type) {
    return Nodes.TYPE[type].name;
  }
});
