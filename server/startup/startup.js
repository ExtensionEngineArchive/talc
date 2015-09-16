
Meteor.startup(function() {
  if (1) {
    Nodes.remove({});
    Comments.remove({});

    var users = createUsers();
    mockGraphA();
    mockGraphB(users);
    mockGraphC();
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
        total: 147
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

  addToGraph(temp, competency._id, topics, 'T');

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

  addToGraph(temp, topics[0], objectives, 'O');

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

  addToGraph(temp, objectives[0], skills, 'S');

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

  addToGraph(temp, objectives[1], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How wait time leads to more complete student answers',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How wait time leads to longer student answers',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How wait time leads to more on-topic student answers',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How wait time leads to increased student confidence',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How wait time leads to increased student participation',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[2], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'A classroom that is student-centered',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'A learning environment where all students feel safe and comfortable voicing their ideas and opinions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'All participants (teacher and students) know that discussion is a process and understand how to participate',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'The teacher and students are committed to engaging in productive discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Discussion topics are carefully selected and planned in advance (and tied to learning outcomes)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Adequate time is allocated for discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'The teacher acts as a facilitator, observer, and mentor (not dominating discussion)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'The teacher provides ongoing feedback to students',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Students that are encouraged to both answer questions as well as pose their own',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[3], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Traditions of school or department',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Too much content coverage requirements',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Time constraints',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Lack of alignment with learning goals',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Culture of department and/or schools',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'No vision of what effective questioning and discussions look like in action',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Lack of student engagement (e.g. inattentiveness, reluctance to participate)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Lack of norms/expectations for questioning and discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'A desire by the teacher to avoid embarrassing students',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'A fear of the teacher of heated arguments',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Perception that the give-and-take of questioning can lead to “loss of control” within the classroom',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Perception that question-based learning can lead to extra work for a teacher',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Student fear of embarrassment or ridicule from peers',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Students ’inability to build on other students’ comments',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Students focus on talking to the teacher rather than talking to one another',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[4], skills, 'S');

  objectives = [];

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify different types of questions and describe the purpose and provide examples of each question type',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify methods for creating effective questions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify techniques to use purposeful questioning to support student engagement and learning during discussions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify a set of questions and techniques for using questioning to support discussion that you observe in live or simulated classrooms. Questions you should be able to answer include:',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, topics[1], objectives, 'O');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Factual Questions – Questions with right or wrong answers (naming, defining, identifying, or giving yes/no responses; often beginning with “what,” “where,” or “when”)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Convergent Questions – Questions with a finite number of acceptable answers (explaining, describing, stating relationships, and comparing/contrasting; often beginning with “why,” “how” or similar phrases, such as “in what ways”)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Divergent Questions – Questions with a wide range of acceptable answers with level of acceptability based on probability or possibility (predicting, hypothesizing, inferring, or reconstructing, often beginning or including words or phrases such as “imagine,” “predict,” “if… then…,” “what if,” or “suppose”)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Evaluative Questions – Questions with answers that require judgment, value, or choice with level acceptability based on the quality of rationale and evidence (valuing, judging, defending, or justifying choices, often beginning or including words or phrases such as “defend,” justify,” or “what do you think about…”)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[0], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Understanding the goal and purpose of a question',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Selecting the appropriate question type',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Phrasing a question clearly, without unnecessary or distracting language',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Adapting question wording to student-language level and learning needs',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[1], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Purposeful questioning (e.g. not just questions that require recitation)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Question sequencing (e.g. moving from low-cognitive to high-cognitive questions)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Wait time',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Student generated questions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Managing student responses and not allowing students to opt out of answering questions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Managing student responses and only accepting right answers for factual or convergent questions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Managing student responses and asking follow-up questions to check for and extend student understanding',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Managing student responses and calling on students without warning (cold calling)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Managing student responses and question that requires the whole class to answer together',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Managing student responses and breaking down questions into smaller components in order to bridge student learning gaps',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[2], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What types of questions did you observe in the classroom (factual, convergent, divergent, or evaluative)?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What patterns of question types did you observe?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Did students generate questions? If so, how did the teacher support that process?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'If you observed more than one type of question, why do you think the teacher asked different types of questions at different times?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What successes did you observe with regard to the teacher’s use of questioning?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What challenges did you observe with regard to the teacher’s use of questioning?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How did questions and questioning techniques support student learning?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What other questions about questioning were raised after your observation?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[3], skills, 'S');

  objectives = [];

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify general planning steps needed to implement effective teacher-led and student-led discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify general strategies for effective and engaging discussions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify a set of techniques for using discussion to promote student learning that you observe in live or simulated classrooms and discuss with the observed teacher(s), if possible. Questions you should be able to answer include:',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, topics[2], objectives, 'O');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Allocating adequate time for discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Designing physical space to support discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Selecting a discussion topic that is closely aligned with learning goals',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Identifying clear expectations for discussion and taking time to reflect',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Identifying clear expectations for discussion and taking time to think before answering',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Identifying clear expectations for discussion and taking time to think out loud to complete a thought',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Identifying clear expectations for discussion and listening to and learn from one another',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Identifying clear expectations for discussion and sharing time to talk',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Identifying clear expectations for discussion and not interrupting (and similar ground rules)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Planning all discussion components with your specific students in mind, including an introduction to the discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Planning all discussion components with your specific students in mind, including an supporting materials that prepare students to participate in the discussion (e.g. readings, graphic organizers)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Planning all discussion components with your specific students in mind, including questions that will engage and probe student thinking (e.g. start with questions aligned to familiar material and then broaden to less familiar material)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Planning all discussion components with your specific students in mind, including questioning techniques to be used during discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Planning all discussion components with your specific students in mind, including a set of questions to support engagement and maintain momentum and flow of discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Planning all discussion components with your specific students in mind, including transitions between topics or discussion points',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Planning all discussion components with your specific students in mind, including how the discussion will be wraped with discussion outcomes connected to learning goals',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Planning all discussion components with your specific students in mind, including debrief of the discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[0], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Making sure students are prepared for the discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Setting expectations that everyone will participate',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Communicating the discussion topic',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'The teacher playing the role of observer and mentor (e.g. using strategies such as sitting with students in a circle, or ensuring three students talk before the teacher contributes)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'The teacher and students speaking or asking questions one at a time',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Active listening',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Giving students time to think about what they are going to say',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Setting expectations that students must build on previous comments before sharing their own thought or idea',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Asking students to explain their thinking or provide examples (or additional examples)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Anticipating misunderstandings and correct misunderstandings, if appropriate',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Allocating time for reflection at end of discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[1], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Was it a small group or large group discussion?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How was a discussion topic introduced to students?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What pre-work did students complete before the discussion?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Were discussion norms/guidelines evident?  If so, what were they?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How did the teacher allocate time for students to think before contributing to the discussion?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What strategies did the teacher use to engage students in the discussion?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What discussion skills did students use?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How did the teacher evaluate student learning during the discussion?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What successes did you observe with regard to the teacher’s use of discussion?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What challenges did you observe with regard to the teacher’s use of discussion?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How did the discussion support student learning?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What other questions about discussions were raised after your observation?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[2], skills, 'S');

  objectives = [];

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Create plans for facilitating both small group and large group discussions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Demonstrate the implementation of your discussion plan and facilitation of both a small group discussion and a large group discussion.',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Evaluate the effectiveness of the small and large group discussions by answering the following questions (for each type of group discussion)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, topics[3], objectives, 'O');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'A discussion topic',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Learning goals for the discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Pre-work to prepare for the discussion',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Norms/guidelines for discussion communicated and implemented in advance',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Questions or sentence startered to initiate discussion, generate student ideas, or encourage the sharing of ideas',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Engagement strategies',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Evaluation techniques for gauging student participation',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Wrap-up strategy',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[0], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How did the group discussion support student learning?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How did the types of questions you asked support student learning in the classroom?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How did your questioning techniques support student learning in the classroom?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What challenges did you face with the discussion?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Overall, was the discussion effective?  If so, why.  If not, why not?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How would you change your approach to and facilitation of this type of group discussion to make it more effective in the future?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'After implementing the changes, was the discussion more effective? If so, how did you know? If not, why not?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[2], skills, 'S');

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

function mockGraphC() {
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
    name: 'Safe, Respectful, Supportive, and Challenging Learning Environment',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum iaculis dui at tincidunt. Nam congue feugiat massa, nec fermentum ligula mollis non. Suspendisse sed nisi metus. Cras posuere magna et placerat pellentesque. Etiam interdum sagittis justo, sit amet egestas est tristique vel. Etiam quis libero vel diam fermentum elementum vitae at turpis. Praesent tellus urna, vestibulum eu molestie eu, faucibus ut nunc. Nulla faucibus purus id ligula pharetra, vitae lacinia felis laoreet.",
    elements: {
      nodes: [],
      edges: []
    },
    stats: {
      nodes: {
        total: 58
      }
    },
    createdAt: new Date()
  });

  competency = Nodes.findOne({ _id: competency });

  topics.push(Nodes.insert({
    type: 'T',
    name: 'Identify the importance of setting high expectations for all students and supporting students in achieving these high expectations.',
    roots: [competency._id],
    createdAt: new Date()
  }));

  topics.push(Nodes.insert({
    type: 'T',
    name: 'Identify and describe set of specific strategies that teachers use to set high expectations and support students in achieving those expectations.',
    roots: [competency._id],
    createdAt: new Date()
  }));

  topics.push(Nodes.insert({
    type: 'T',
    name: 'Create a plan for establishing high expectations in your classroom and cultivating a classroom culture that supports students in achieving those high expectations.',
    roots: [competency._id],
    createdAt: new Date()
  }));

  topics.push(Nodes.insert({
    type: 'T',
    name: 'Establish and implement a plan for communicating high expectations to students and supporting those students in achieving high expectations.',
    roots: [competency._id],
    createdAt: new Date()
  }));

  temp.elements.nodes.push({
    data: {
      id: competency._id,
      type: 'R'
    }
  });

  addToGraph(temp, competency._id, topics, 'T');

  objectives = [];

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify and describe why it is important to set and support high expectations for all students',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify and describe elements of classroom culture that are essential in setting and supporting high expectations',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify and describe common barriers to setting and supporting high expectations',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, topics[0], objectives, 'O');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Most students will rise to the level of expectations teachers set for them',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'High expectations for all students will lead to greater numbers of students mastering content and producing high quality work',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'A positive classroom culture provides the encouragement and support students need to meet high expectations',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'A classroom where students succeed in meeting high expectations can inspire hard work in other areas of school and life',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[0], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Perseverance and effort',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Mastery of challenging content',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'High quality work',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Multiple opportunities for revision and improvement',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'A “growth mindset” (a student’s belief that he/she can develop skills and master content through dedication and hard work)',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[1], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Preconceived notions from students and teachers of who can/will be successful',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'High expectations not set for students in other classes, in the school as a whole, or at home',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'A school or community culture where “getting by” by doing the minimum is considered acceptable performance',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Teachers not able to provide the extra time and effort required to support all students in meeting high expectations',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Teachers not confident with their own content knowledge',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[2], skills, 'S');

  objectives = [];

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Identify and describe strategies for setting and supporting high expectations for students',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Describe specific techniques used to set high expectations and support students in achieving these expectations informed by your observation of a live or simulated classroom and discussions with experienced classroom teachers. Questions you should be able to answer include:',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, topics[1], objectives, 'O');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Introducing the concept of “growth mindset” to students and supporting students in their efforts to improve in areas where they struggle',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Encouraging and supporting students to learn and understand challenging content',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Engaging students to engage deeply with rigorous and meaningful work',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Brainstorming characteristics of high-quality student work with students',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Providing models of high-quality student work',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Promoting a culture of high expectations and shared purpose through group work',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Co-creating rubrics with students that allow them to contribute to the setting of challenging goals',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Setting an expectation that students should revise their work until it demonstrates high quality and content mastery',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Providing adequate explanation and instruction on an assignment so students know what is expected of them',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Giving students adequate time and support in class to work on challenging projects',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Providing extra support outside of class',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Connecting students with additional resources: tutoring, study groups, peer mentors',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Celebrating high quality work by sharing student work with audiences outside the classroom',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[0], skills, 'S');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What techniques did the teacher use to set high expectations?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What techniques did the teacher use to support high expectations?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Where do you see evidence of students’ desire to meet high expectations and master challenging content?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Where do you see evidence of students supporting each other to meet high expectations and master challenging content?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Where do you see evidence of a growth mindset? Perseverance?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'According to teachers, what techniques have worked and not worked to communicate high expectations and support students in achieving those expectations?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[1], skills, 'S');

  objectives = [];

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Create a plan for establishing high expectations and supporting students in achieving those high expectations',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Explain how your plan will communicate high expectations to all students',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Explain how your plan would provide ongoing support to students in meeting those expectations',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, topics[2], objectives, 'O');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Strategies that set high expectations for all students',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Strategies that build perseverance and a respect for learning and high-quality work into a classroom culture',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Strategies that support and celebrate mastering content and the production of high quality work',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Other strategies described in 4.2.1 that support students reaching for and meeting high expectations',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[0], skills, 'S');

  objectives = [];

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Demonstrate the establishment and implementation of your plan in the classroom',
    roots: [competency._id],
    createdAt: new Date()
  }));

  objectives.push(Nodes.insert({
    type: 'O',
    name: 'Evaluate the effectiveness of your plan by answering the following questions',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, topics[3], objectives, 'O');

  skills = [];

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How did your plan clearly communicate specific high expectations to students?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How did your plan create a culture of the high expectations?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How did your plan support students in reaching the high expectations set by you?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'Overall, was the plan effective? If so, why? If not, why not?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'How would you change your plan to make it more effective in the future?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'After implementing the changes, was your plan more effective? If so, how did you know? If not, why wasn’t it more effective?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  skills.push(Nodes.insert({
    type: 'S',
    name: 'What questions do you still have about setting high expectations and supporting students in achieving those expectations?',
    roots: [competency._id],
    createdAt: new Date()
  }));

  addToGraph(temp, objectives[1], skills, 'S');

  Nodes.update(competency._id, {
    $set: {
      elements: temp.elements
    }
  });
}

function addToGraph(graph, sourceId, targetIds, type) {
  for (j = 0; j < targetIds.length; j++) {
    graph.elements.nodes.push({
      data: {
        id: targetIds[j],
        type: type
      }
    });

    graph.elements.edges.push({
      data: {
        source: sourceId,
        target: targetIds[j]
      }
    });
  }
}
