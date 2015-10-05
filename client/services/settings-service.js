
Dependency.add('settingsService', (function settingsService() {
  var s = {
    view: {}
  };

  var data = {
    view: {
      categories: ['Global Access Management'],
      current: new ReactiveVar('Global Access Management')
    }
  };

  s.view.categories = function() {
    return data.view.categories;
  };

  s.view.current = function() {
    return data.view.current.get();
  };

  s.view.switch = function(view) {
    if (Lazy(data.view.categories).contains(view)) {
      data.view.current.set(view);
    } else {
      throw new Error('Settings: Unknown view');
    }
  };

  return s;
})());
