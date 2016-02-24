Template.experience.helpers({
  //Load the author of the experience
  user: function() {
    return Meteor.users.findOne({_id: Template.instance().data.user});
  },
  //Load the photo from Ares
  photoUrl: function() {
    var user = Meteor.users.findOne({_id: Template.instance().data.user});
    if(!user.services.ares.avatar_thumb || user.services.ares.avatar_thumb == '') return '/img/question.png';
    return user.services.ares.avatar_thumb;
  },
  //Generate the first line (example : "Stage de première année")
  basicInfo: function() {
    var exp = Template.instance().data;
    var str = "Stage ";
    if(exp.year == 'other') {
      str += "'" + exp.yearPrecision + "'";
    } else {
      str += "de " + YearLabels[exp.year];
    }
    return str;
  },
  //Generate the date line (Stage du ... au ...)
  dateInfo: function() {
    var dateStart = Template.instance().data.dateStart;
    var dateEnd = Template.instance().data.dateEnd;
    return "Du " + moment(dateStart).format('LL') + " au " + moment(dateEnd).format('LL');
  },
  canEditExperience:function() {
    return canEditExperience(Meteor.userId(), Template.instance().data);
  },
  canDeleteExperience: function() {
    return canDeleteExperience(Meteor.userId(), Template.instance().data);
  }
});

Template.experience.events({
  'click .experience .edit-button' : function() {
    Router.go('/experience/edit/' + Template.instance().data._id);
  },
  'click .experience .delete-button' : function() {
    $('.delete-experience-dialog').openModal(); //Open confirmation
  },
  'click .confirm-delete-experience' : function() {
    Meteor.call('deleteExperience', Template.instance().data);
  }
});

Template.experience.rendered = function() {
  $('.experience-rating').raty({
    score: function() {
      return $(this).attr('data-score');
    },
    readOnly: true,
    starType: 'i'
  });
}
