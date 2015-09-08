
Meteor.startup(function() {
  if (!Meteor.users.findOne() && Meteor.settings.private.dev.mocks) {
    Nodes.remove({});
    Comments.remove({});

    var users = createUsers();
    mockGraphA();
    mockGraphB(users);
  }
});

function createUsers() {
  Meteor.users.remove({});
  var users = [];

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

function mockGraphA() {
  var competency;
  var topics = [];
  var objectives = [];
  var skills = [];
  var i;
  var j;

  var temp = {
    elements: {
      nodes: [],
      edges: []
    }
  };

  competency = Nodes.insert({
    type: 'R',
    name: 'Classroom Management',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum iaculis dui at tincidunt. Nam congue feugiat massa, nec fermentum ligula mollis non. Suspendisse sed nisi metus. Cras posuere magna et placerat pellentesque. Etiam interdum sagittis justo, sit amet egestas est tristique vel. Etiam quis libero vel diam fermentum elementum vitae at turpis. Praesent tellus urna, vestibulum eu molestie eu, faucibus ut nunc. Nulla faucibus purus id ligula pharetra, vitae lacinia felis laoreet.",
    elements: {
      nodes: [],
      edges: []
    },
    stats: {
      nodes: {
        total: 27
      }
    },
    createdAt: new Date()
  });

  competency = Nodes.findOne({ _id: competency });

  topics.push(Nodes.insert({
    type: 'T',
    name: 'Identify key concepts and research related to the use of purposeful questioning and discussions to engage students in learning',
    roots: [competency._id],
    createdAt: new Date()
  }));

  topics.push(Nodes.insert({
    type: 'T',
    name: 'Identify and describe question style, wording and types and techniques for questioning that can be used with individual students or in discussions to support student learning.',
    roots: [competency._id],
    createdAt: new Date()
  }));

  topics.push(Nodes.insert({
    type: 'T',
    name: 'Identify and describe planning and facilitating needs required for purposeful discussions that support student learning.',
    roots: [competency._id],
    createdAt: new Date()
  }));

  topics.push(Nodes.insert({
    type: 'T',
    name: 'Plan and facilitate a purposeful discussion that supports student learning in both a small group and large group context.',
    roots: [competency._id],
    createdAt: new Date()
  }));

  temp.elements.nodes.push({
    data: {
      id: competency._id,
      type: 'R'
    }
  });

  for (j = 0; j < topics.length; j++) {
    temp.elements.nodes.push({
      data: {
        id: topics[j],
        type: 'T'
      }
    });

    temp.elements.edges.push({
      data: {
        source: competency._id,
        target: topics[j]
      }
    });
  }

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Describe the importance of questioning and discussion in terms of student learning',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Describe how listening (i.e., students and teachers listening to both questions and responses from each other) contributes to effective question- and discussion-based teaching',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Define “wait time” and describe its importance in student learning',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify critical conditions for effective questioning and discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify and describe the common barriers to planning and facilitating questioning and discussions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  for (j = 0; j < objectives.length; j++) {
    temp.elements.nodes.push({
      data: {
        id: objectives[j],
        type: 'O'
      }
    });

    temp.elements.edges.push({
      data: {
        source: topics[0],
        target: objectives[j]
      }
    });
  }

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Providing opportunities for students to take responsibility for their own learning',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Discovering and activating students’ prior knowledge',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Priming students’ brains for new knowledge',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Making student thinking visible to teacher and/or peers',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Checking and clarifying  what students do or do not understand',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Deepening students’ individual and shared understanding of content and skills',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Increasing engagement',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Providing opportunities for students to formulate hypotheses and predictions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Providing opportunities for students to make connections within the discipline and across disciplines',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Challenging students’ misconceptions and/or previously held views',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Validating and building on student ideas to increase engagement and understanding',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Developing students’ critical thinking and creative problem-solving skills',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Developing students’ ability to generate and ask their own questions in the context of independent learning and group discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Strengthening student listening, speaking, and interpretation skills',
    roots: [competency._id],
    createdAt: new Date()
  }));

  for (j = 0; j < skills.length; j++) {
    temp.elements.nodes.push({
      data: {
        id: skills[j],
        type: 'S'
      }
    });

    temp.elements.edges.push({
      data: {
        source: objectives[0],
        target: skills[j]
      }
    });
  }

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How listening validates student responses',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How listening builds student trust',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How listening enables clarification and probing of student responses',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How listening allows others to build on student responses',
    roots: [competency._id],
    createdAt: new Date()
  }));

  for (j = 0; j < skills.length; j++) {
    temp.elements.nodes.push({
      data: {
        id: skills[j],
        type: 'S'
      }
    });

    temp.elements.edges.push({
      data: {
        source: objectives[1],
        target: skills[j]
      }
    });
  }

  Nodes.update(competency._id, {
    $set: {
      elements: temp.elements
    }
  });
}

function mockGraphB(users) {
  var i;
  var j;
  var k;
  var m;
  var temp;
  var mockCompetencies = [];
  var mockTopics = [];
  var mockObjectives = [];
  var mockSkills = [];

  // Create competencies
  for (i = 1; i < 5; i++) {
    mockCompetencies.push(Nodes.insert({
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum iaculis dui at tincidunt. Nam congue feugiat massa, nec fermentum ligula mollis non. Suspendisse sed nisi metus. Cras posuere magna et placerat pellentesque. Etiam interdum sagittis justo, sit amet egestas est tristique vel. Etiam quis libero vel diam fermentum elementum vitae at turpis. Praesent tellus urna, vestibulum eu molestie eu, faucibus ut nunc. Nulla faucibus purus id ligula pharetra, vitae lacinia felis laoreet.",
      type: 'R',
      name: 'Competency ' + i,
      elements: {
        nodes: [],
        edges: []
      },
      stats: {
        nodes: {
          total: 105
        }
      },
      createdAt: new Date()
    }));
  }

  // Create topics
  for (i = 1; i < 21; i++) {
    mockTopics.push(Nodes.insert({
      type: 'T',
      name: 'Topic ' + i,
      roots: [mockCompetencies[Math.floor((i-1)/5)]],
      createdAt: new Date()
    }));
  }

  // Create learning objectives
  for (i = 1; i < 81; i++) {
    mockObjectives.push(Nodes.insert({
      type: 'O',
      name: 'Learning Objective ' + i,
      roots: [mockCompetencies[Math.floor((i-1)/20)]],
      createdAt: new Date()
    }));
  }

  // Create skills
  for (i = 1; i < 321; i++) {
    mockSkills.push(Nodes.insert({
      type: 'S',
      name: 'Skill ' + i,
      roots: [mockCompetencies[Math.floor((i-1)/80)]],
      createdAt: new Date()
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
