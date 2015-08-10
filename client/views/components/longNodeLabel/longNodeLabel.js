Template.longNodeLabelComponent.helpers({
  color: function() {
    return Nodes.TYPE[this.node.type].color;
  },
  fullName: function () {
    return Nodes.TYPE[this.node.type].name;
  }
});
