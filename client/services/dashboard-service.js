
Dependency.add('dashboardService', (function dashboardService() {
  var s = {
    view: {}
  };

  var data = {
    view: {
      categories: ['grid', 'list'],
      current: new ReactiveVar('grid')
    }
  };

  s.view.current = function() {
    return data.view.current.get();
  };

  s.view.switch = function(view) {
    if (Lazy(data.view.categories).contains(view)) {
      data.view.current.set(view);
    } else {
      throw new Error('Graph settings: Unknown view');
    }
  };
  
  return s;
})());
