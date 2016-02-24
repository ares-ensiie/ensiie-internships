/**
Find the tags associated with the given tags
We try to predict tags based on already inserted experiences.
Some tag associations have a better "score" than others. These associations are stored in the collection "tagsAssociation"
@param tags array of string
**/
associatedTags = function(tags) {
  if(!Meteor.user())
    throw new Meteor.Error(403, 'You must be authenticated.');

  var associations = [];

  //Load the associated tags
  tags.forEach(function(tag) {
    associations = associations.concat(Collections.tagAssociations.find({
      tags: tag
    }).fetch());
  });

  //Remove duplicates, and sort by score
  var tagsArray = _.map(associations, function(i){ return i.tags});
  var associated = _.flatten(tagsArray, true);
  associated = _.without.apply(this, [associated].concat(tags));
  associated = _.countBy(associated, function(a){return a;});
  associated = Object.keys(associated).sort(function(a,b){return associated[b]-associated[a]});

  return associated;
}

Meteor.methods({
  /**
  Add a tag association
  **/
  addTag: function(tag, linkedTag) {
    if(!Meteor.user())
      throw new Meteor.Error(403, 'You must be authenticated.');

    var tagTab = [tag, linkedTag];


    var exists = Collections.tagAssociations.findOne({
      tags: {
        $all: tagTab
      }
    });

    //If the association exists already, we increase the score
    if(exists) {
      Collections.tagAssociations.update({
        _id: exists._id
      }, {
        $set: {
          score: exists.score+1
        }
      });
    } else {
      Collections.tagAssociations.insert({
        tags: tagTab,
        score:1
      });
    }


  }
});
