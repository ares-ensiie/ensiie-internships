Template.experience.helpers({
  user: function() {
    return Meteor.users.findOne({_id: Template.instance().data.user});
  },
  photoUrl: function() {
    var user = Meteor.users.findOne({_id: Template.instance().data.user});
    if(!user) return '';
    return Gravatar.imageUrl(user.profile.email);
  },
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
  dateInfo: function() {
    var dateStart = Template.instance().data.dateStart;
    var dateEnd = Template.instance().data.dateEnd;
    return "Du " + moment(dateStart).format('LL') + " au " + moment(dateEnd).format('LL');
  }
});

Template.experience.events({
  'click .experience .edit-button' : function() {
    Router.go('/experience/edit/' + Template.instance().data._id);
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
