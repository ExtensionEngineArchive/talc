
var browserService;
var competencyService;

Dependency.autorun(function() {
  browserService = Dependency.get('browserService');
  competencyService = Dependency.get('competencyService');
});

Template.ceDetails.helpers({
  node: function() {
    if (browserService.selected()) {
      return Nodes.findOne({ _id: browserService.selected()._id });
    } else {
      return { name: '', type: 'C' };
    }
  },
  parents: function() {
    if (browserService.selected()) {
      var parentIds = Nodes.getParents(competencyService.graph(), browserService.selected()._id);
      if (parentIds && parentIds.length > 0) {
        return Nodes.find({
          _id : {
            $in : parentIds
          }
        });
      }
    }

    return [];
  }
});
