
Meteor.startup(function() {
  // Uncomment to delete existing nodes
  // Meteor.neo4j.query('MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r');

  if (!Competencies.find({})) {
    var i;
    var j;
    var k;

    var mockCompetencies = [];
    var mockTopics = [];
    var mockObjectives = [];
    var mockSkills = [];

    // Insert Competencies
    for (i = 0; i < 5; i++) {
      mockCompetencies.push(Competencies.insert({
        name: 'Competency ' + (i + 1),
        __labels: ':Competency'
      }));
    }

    // Insert Topics
    for (i = 0; i < 4; i++) {
      mockTopics.push(Topics.insert({
        name: 'Topic ' + (i + 1),
        __labels: ':Topic'
      }));
    }

    // Insert LearningObjectives
    for (i = 0; i < 20; i++) {
      mockObjectives.push(LearningObjectives.insert({
        name: 'Learning Objective ' + (i + 1),
        __labels: ':LearningObjective'
      }));
    }

    // Insert Skills
    for (i = 0; i < 40; i++) {
      mockSkills.push(Skills.insert({
        name: 'Skill ' + (i + 1),
        __labels: ':Skill'
      }));
    }

    // Associate Competencies with Topics
    j = 0;
    for (i = 0; i < 2; i++) {
      k = 0;
      while (k < 2) {
        Meteor.neo4j.query(
          "MATCH (a { _id: {a}}), (b { _id: {b}}) CREATE a-[:CONSISTS_OF]->b",
          { a: mockCompetencies[i], b: mockTopics[j] });

        k++;
        j++;
      }
    }

    // Associate Topics with LearningObjectives
    j = 0;
    for (i = 0; i < 4; i++) {
      k = 0;
      while (k < 5) {
        Meteor.neo4j.query(
          "MATCH (a { _id: {a}}), (b { _id: {b}}) CREATE a-[:CONSISTS_OF]->b",
          { a: mockTopics[i], b: mockObjectives[j] });

        k++;
        j++;
      }
    }

    // Associate LearningObjectives with Skills
    j = 0;
    for (i = 0; i < 20; i++) {
      k = 0;
      while (k < 2) {
        Meteor.neo4j.query(
          "MATCH (a { _id: {a}}), (b { _id: {b}}) CREATE a-[:CONSISTS_OF]->b",
          { a: mockObjectives[i], b: mockSkills[j] });

        k++;
        j++;
      }
    }
  }
});
