if (_.isUndefined(Ares)) {
  Ares = {};
}

Accounts.oauth.registerService('ares');

if (Meteor.isClient) {
  Meteor.loginWithAres = function(options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Ares.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.ares'],
    forOtherUsers: []
  });
}
