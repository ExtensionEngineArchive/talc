
Router.plugin('auth', {
  authenticate: {
    route: 'signIn'
  },
  except: [
    'signIn'
  ]
});

Router.route('/sign-in', {
  name: 'signIn',
  layoutTemplate: 'AuthLayout'
});
