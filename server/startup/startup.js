
Meteor.startup(function() {
  if (!Meteor.users.findOne() || 0) {
    var users = createUsers();
    createCompetencies(users);
  }
});

function createUsers() {
  var users = [];
  Meteor.users.remove({});

  users.push({
    _id: Accounts.createUser({
      email: 'admin@talc.io',
      password: 'test',
      profile: {
        firstName: 'Administrator',
        lastName: ''
      }
    }),
    roles: {
      'global': ['admin']
    }
  });

  users.push({
    _id: Accounts.createUser({
      email: 'dperisic@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Damir',
        lastName: 'Perisic',
      }
    }),
    roles: {
      'global': ['admin']
    }
  });

  users.push({
    _id: Accounts.createUser({
      email: 'scout@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Scout',
        lastName: 'Stevenson'
      }
    }),
    roles: {
      'global': ['admin']
    }
  });

  users.push({
    _id: Accounts.createUser({
      email: 'roya@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Roya',
        lastName: 'Rakhshan'
      }
    }),
    roles: {
      'global': ['admin']
    }
  });

  users.push({
    _id: Accounts.createUser({
      email: 'jared@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Jared',
        lastName: 'Moore'
      }
    }),
    roles: {
      'global': ['admin']
    }
  });

  users.push({
    _id: Accounts.createUser({
      email: 'fn@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Furqan',
        lastName: 'Nazeeri'
      }
    }),
    roles: {
      'global': ['admin']
    }
  });

  users.push({
    _id: Accounts.createUser({
      email: 'evan@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Evan',
        lastName: 'Brown'
      }
    }),
    roles: {
      'global': ['graph-create'],
      'other': ['active-collaborator']
    }
  });

  users.push({
    _id: Accounts.createUser({
      email: 'niksa@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Niksa',
        lastName: 'Radovic'
      }
    }),
    roles: {
      'global': ['graph-create'],
      'other': ['active-collaborator']
    }
  });

  users.push({
    _id: Accounts.createUser({
      email: 'bob@extensionengine.com',
      password: 'test',
      profile: {
        firstName: 'Bob',
        lastName: 'Allard'
      }
    }),
    roles: {
      'global': [],
      'other': ['passive-collaborator']
    }
  });

  return users;
}

function createCompetencies(users) {
  var i;
  var j;
  var k;
  var m;
  var temp;
  var mockCompetencies = [];
  var mockTopics = [];
  var mockObjectives = [];
  var mockSkills = [];

  Nodes.remove({});

  // Create competencies
  for (i = 1; i < 5; i++) {
    mockCompetencies.push(Nodes.insert({
      type: 'R',
      name: 'Competency ' + i,
      elements: {
        nodes: [],
        edges: []
      }
    }));
  }

  // Create topics
  for (i = 1; i < 21; i++) {
    mockTopics.push(Nodes.insert({
      type: 'T',
      name: 'Topic ' + i,
      roots: [mockCompetencies[Math.floor((i-1)/5)]]
    }));
  }

  // Create learning objectives
  for (i = 1; i < 81; i++) {
    mockObjectives.push(Nodes.insert({
      type: 'O',
      name: 'Learning Objective ' + i,
      roots: [mockCompetencies[Math.floor((i-1)/20)]]
    }));
  }

  // Create skills
  for (i = 1; i < 321; i++) {
    mockSkills.push(Nodes.insert({
      type: 'S',
      name: 'Skill ' + i,
      roots: [mockCompetencies[Math.floor((i-1)/80)]]
    }));
  }

  // Assign nodes to competencies
  for (i = 0; i < 5; i++) {
    temp = {
      elements: {
        nodes: [],
        edges: []
      }
    };

    temp.elements.nodes.push({
      data: {
        id: mockCompetencies[i],
        type: 'R'
      }
    });

    // Add topics
    for (j = 0; j < 5; j++) {
      temp.elements.nodes.push({
        data: {
          id: mockTopics[(i * 5) + j],
          type: 'T'
        }
      });

      temp.elements.edges.push({
        data: {
          source: mockCompetencies[i],
          target: mockTopics[(i * 5) + j]
        }
      });

      // Add learning objectives
      for (k = 0; k < 4; k++) {
        temp.elements.nodes.push({
          data: {
            id: mockObjectives[(i * 5 * 4) + (j * 4) + k],
            type: 'O'
          }
        });

        temp.elements.edges.push({
          data: {
            source: mockTopics[(i * 5) + j],
            target: mockObjectives[(i * 5 * 4) + (j * 4) + k]
          }
        });

        // Add skills
        for (m = 0; m < 4; m++) {
          temp.elements.nodes.push({
            data: {
              id: mockSkills[(i * 5 * 4 * 4) + (j * 4 * 4) + (k * 4) + m],
              type: 'S'
            }
          });

          temp.elements.edges.push({
            data: {
              source: mockObjectives[(i * 5 * 4) + (j * 4) + k],
              target: mockSkills[(i * 5 * 4 * 4) + (j * 4 * 4) + (k * 4) + m]
            }
          });
        }
      }
    }

    Nodes.update(mockCompetencies[i], {
      $set: {
        elements: temp.elements
      }
    });
  }

  Lazy(mockCompetencies).each(function(c) {
    Lazy(users).each(function(u) {
      if (u.roles.global[0] == 'admin') {
        Roles.addUsersToRoles(u._id, u.roles.global, 'global');
      } else {
        Roles.addUsersToRoles(u._id, u.roles.global, 'global');
        Roles.addUsersToRoles(u._id, u.roles.other, c);
      }
    });
  });
}
