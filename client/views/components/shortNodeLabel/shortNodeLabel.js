
Template.shortNodeLabelComponent.helpers({
  color: function() {
    if (this.node) {
      return Nodes.TYPE[this.node.type].color;
    }
  }
});
