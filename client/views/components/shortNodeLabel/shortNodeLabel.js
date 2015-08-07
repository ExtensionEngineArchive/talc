Template.shortNodeLabelComponent.helpers({
  color: function() {
    return Nodes.TYPE[this.node.type].color;
  }
});
