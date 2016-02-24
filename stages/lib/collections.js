/**
Collections description.
The project uses meteor-simple-schema.
**/

Collections = {
  companies: new Mongo.Collection("companies"),
  tagAssociations: new Mongo.Collection('tagAssociations'),
  experiences: new Mongo.Collection('experiences'),
}


Schema = {};

SimpleSchema.messages({
  "dateOrderIncorrect": "La date de début est après la date de fin."
});

/**
Description of a Company document
**/
Schema.Companies = new SimpleSchema({
    name: {
      type: String,
      optional: false
    },
    description: {
      type: String,
      optional: false
    },
    address: {
      type: String,
      optional: false
    },
    photo: {
      type:String,
      optional: true
    },
    location: {
      type: Object,
      optional: true,
    },
    'location.latitude': {
      type: Number,
      optional: true,
      decimal: true
    },
    'location.longitude': {
      type: Number,
      optional: true,
      decimal: true
    },
    size: {
      type: Number,
      optional: false,
      min:0,
      max:4
    },
    website: {
      type: String,
      optional: true
    },
    creator: {
      type: String,
      optional: false
    }
});

/**
Description of an association of tag.
This collection is used for predicting tags
**/
Schema.TagAssociations = new SimpleSchema({
    tags: {
      type:[String],
      optional: false
    },
    score: {
      type:Number,
      optional: false,
      min:1
    }
});

/**
Description of an user
**/
Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true //because we use meteor-ares for logging
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: { //Will be used in the future for admin accounts
        type: [String],
        optional: true
    }
});

/**
Description of an experience
**/
Schema.Experience = new SimpleSchema({
    year: {
      type: String,
      allowedValues: ['1A', '2A', '3A', 'other'],
      optional: false
    },
    yearPrecision: {
      type:String,
      optional:true
    },
    dateStart: {
      type:Date,
      optional:false
    },
    dateEnd: {
      type:Date,
      optional:false,
      custom: function () {
        if (this.value < this.field('dateStart').value) {
          return "dateOrderIncorrect";
        }
      }
    },
    title: {
      type:String,
      optional:false
    },
    description: {
      type:String,
      optional:false
    },
    tags: {
      type:[String],
      optional:true
    },
    dateStart: {
      type:Date,
      optional:false
    },
    ratings: {
      type:Object,
      optional:false
    },
    'ratings.work': {
      type:Number,
      optional:false,
      min:0,
      max:5
    },
    'ratings.interest': {
      type:Number,
      optional:false,
      min:0,
      max:5
    },
    'ratings.learning': {
      type:Number,
      optional:false,
      min:0,
      max:5
    },
    'ratings.difficulty': {
      type:Number,
      optional:false,
      min:0,
      max:5
    },
    'ratings.general': {
      type:Number,
      optional:false,
      min:0,
      max:5
    },
    comment: {
      type:String,
      optional:false
    },
    company: {
      type: String,
      optional: false
    },
    user: {
      type: String,
      optional: false
    }
});

//We attach schemas to collections
Meteor.users.attachSchema(Schema.User);
Collections.companies.attachSchema(Schema.Companies);
Collections.tagAssociations.attachSchema(Schema.TagAssociations);
Collections.experiences.attachSchema(Schema.Experience);
