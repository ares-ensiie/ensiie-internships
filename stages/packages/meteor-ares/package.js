Package.describe({
  name: "stebe:meteor-ares",
  summary: "OAuth authentication with Ares",
  documentation: "README.md",
  version: "1.0.0",
});

Package.onUse(function(api) {
  // api.versionsFrom('METEOR@1.1.1');
  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('service-configuration', ['client', 'server']);
  api.use('underscore', ['client', 'server']);
  api.use(['random', 'templating@1.0.11'], 'client');

  api.addFiles('lib/ares_common.js', ['client', 'server']);
  api.addFiles('lib/ares_server.js', 'server');
  api.addFiles('lib/ares_client.js', 'client');
});
