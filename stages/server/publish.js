//We publish only the needed fields for users
Meteor.publish('publicUsers', function() {
  if(!this.userId) return undefined;
  return Meteor.users.find({}, {
    fields: {'profile': 1, 'services.ares.avatar_thumb': 1, 'services.ares.lastname': 1, 'services.ares.name': 1}
  });

});

//We publish everything else when the user is authenticated
Meteor.publish('experiences', function() {
  if(!this.userId) return undefined;
  return Collections.experiences.find();

});

Meteor.publish('companies', function() {
  if(!this.userId) return undefined;
  return Collections.companies.find();

});

Meteor.publish('tagAssociations', function() {
  if(!this.userId) return undefined;
  return Collections.tagAssociations.find();

});

Meteor.publish('images', function() {
  if(!this.userId) return undefined;
  return Images.find();

});
