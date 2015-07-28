
this.N4JDB = new Meteor.Neo4j("http://neo4j:temp123@localhost:7474");

Meteor.neo4j.allowClientQuery = true;
Meteor.neo4j.connectionURL = "http://neo4j:temp123@localhost:7474";

// Deny all writing actions on client
Meteor.neo4j.set.deny(Meteor.neo4j.rules.write);
