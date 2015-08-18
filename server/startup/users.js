
Meteor.startup(function() {

  if (!Meteor.users.find().count()) {
    Meteor.users.remove({});

    Accounts.createUser({
      email: 'admin@talc.io',
      password: 'test',
      profile: {
        firstName: 'Administrator',
        lastName: '',
        admin: true
      }
    });

    Accounts.createUser({
      email: 'dperisic@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Damir',
        lastName: 'Perisic',
        admin: true
      }
    });

    Accounts.createUser({
      email: 'fn@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Furqan',
        lastName: 'Nazeeri',
        admin: false
      }
    });

    Accounts.createUser({
      email: 'evan@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Evan',
        lastName: 'Brown',
        admin: false
      }
    });

    Accounts.createUser({
      email: 'niksa@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Niksa',
        lastName: 'Radovic',
        admin: false
      }
    });

    Accounts.createUser({
      email: 'bob@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Bob',
        lastName: 'Allard',
        admin: false
      }
    });
  }
});
