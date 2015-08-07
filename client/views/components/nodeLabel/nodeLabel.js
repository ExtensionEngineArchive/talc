
Template.nodeLabel.helpers({
  color: function(type) {
    return Nodes.TYPE[type].color;
  }
});

Template.nodeLabelFull.helpers({
  color: function(type) {
    return Nodes.TYPE[type].color;
  },
  fullName: function (type) {
    return Nodes.TYPE[type].name;
  }
});
