
// TODO: Publish user related competencies
Competencies.publish('allCompetencies', function(){
  return 'MATCH (competencies:Competency) RETURN competencies';
});
