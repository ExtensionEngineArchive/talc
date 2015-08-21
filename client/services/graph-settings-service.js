
Dependency.add('graphSettingsService', (function graphSettingsService() {
  var s = {
    view: {}
  };

  var data = {
    view: {
      categories: ['General', 'Access Management'],
      current: new ReactiveVar('General')
    }
  };

  s.view.categories = function() {
    return data.view.categories;
  };

  s.view.current = function() {
    return data.view.current.get();
  };

  s.view.switch = function(view) {
    if (Lazy(data.view.list).contains(view)) {
      data.view.current.set(view);
    } else {
      throw new Error('Graph settings: Unknown view');
    }
  };

  return s;
})());
