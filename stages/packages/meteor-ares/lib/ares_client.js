Ares.requestCredential = function (options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'ares'});

  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = encodeURIComponent(Random.id());
  var loginStyle = OAuth._loginStyle('ares', config, options);

  var loginUrl = "https://ares-ensiie.eu/oauth/authorize" +
    '?response_type=code' +
		'&client_id=' + config.clientId +
    '&redirect_uri=' + encodeURIComponent(Meteor.absoluteUrl("_oauth/ares")) +
    '&scope=' + config.scope +
		'&state=' + OAuth._stateParam(loginStyle, credentialToken);

  OAuth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};
