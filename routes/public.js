
Router.plugin('auth', {
  authenticate: {
    route: 'signIn'
  },
  except: [
    'signIn',
    'enrollAccount',
    'resetPassword'
  ]
});

Router.route('/sign-in', {
  name: 'signIn',
  layoutTemplate: 'AuthLayout'
});

Router.route('/enroll-account/:token', {
  name: 'enrollAccount',
  layoutTemplate: 'AuthLayout'
});

Router.route('/reset-password/:token', {
  name: 'resetPassword',
  layoutTemplate: 'AuthLayout'
});
