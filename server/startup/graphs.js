
Meteor.startup(function() {
  var i;
  var j;
  var k;
  var m;
  var temp;
  var mockCompetencies = [];
  var mockTopics = [];
  var mockObjectives = [];
  var mockSkills = [];

  // Uncomment to delete existing nodes
  // Nodes.remove({});

  if (!Nodes.findOne()) {
    // Create competencies
    for (i = 1; i < 5; i++) {
      mockCompetencies.push(Nodes.insert({
        type: 'C',
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
        name: 'Topic ' + i
      }));
    }

    // Create learning objectives
    for (i = 1; i < 81; i++) {
      mockObjectives.push(Nodes.insert({
        type: 'O',
        name: 'Learning Objective ' + i
      }));
    }

    // Create skills
    for (i = 1; i < 321; i++) {
      mockSkills.push(Nodes.insert({
        type: 'S',
        name: 'Skill ' + i
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
          type: 'C'
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
  }
});
