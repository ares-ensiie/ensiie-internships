var OAuth = Package.oauth.OAuth;
var urlUtil = Npm.require('url');

OAuth.registerService('ares', 2, null, function(query) {
  var response = getTokenResponse(query);
  var accessToken = response.accessToken;
  var aresData = getAresData(accessToken);
  aresData.accessToken = accessToken;
  aresData.expiresAt = (+new Date) + (1000 * response.expiresIn);

  aresData.id = aresData.uid;  

  return {
    serviceData: aresData,
  };
});

var isJSON = function (str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

var getTokenResponse = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'ares'});
  console.log(query);
  if (!config)
    throw new ServiceConfiguration.ConfigError("Service not configured");

  var responseContent;
  try {
    responseContent = Meteor.http.post(
      "https://ares-ensiie.eu/oauth/token?grant_type=authorization_code" +
      "&code=" + query.code +
      "&client_id=" + config.clientId +
      "&client_secret=" + OAuth.openSecret(config.secret) +
      "&redirect_uri=" + encodeURIComponent(Meteor.absoluteUrl("_oauth/ares"))
     ).content;
  } catch (err) {
    throw new Error("Failed to complete OAuth handshake\n\n" + err.message);
  }

  if (!isJSON(responseContent)) {
    throw new Error("Failed to complete OAuth handshake" + responseContent);
  }

  var parsedResponse = JSON.parse(responseContent);
  var accessToken = parsedResponse.access_token;
  var expiresIn = parsedResponse.expires_in;

  if (!accessToken) {
    throw new Error("Failed to complete OAuth handshake\n\
      did not receive an oauth token.\n" + responseContent
    );
  }

  return {
    accessToken: accessToken,
    expiresIn: expiresIn
  };
};

var getAresData = function (accessToken) {
  try {
    return Meteor.http.get("https://ares-ensiie.eu/api/v1/me.json", {
      params: { access_token: accessToken } }
    ).data;
  } catch (err) {
    throw new Error("Failed to fetch identity from Ares. " + err.message);
  }
};

Ares.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
