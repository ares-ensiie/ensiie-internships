ServiceConfiguration.configurations.remove({
  service: "ares"
});

ServiceConfiguration.configurations.insert({
  service: "ares",
  clientId: process.env.ARES_CLIENT_ID,
  secret: process.env.ARES_SECRET,
  scope:'public'
});

// Reverse
Geo = new GeoCoder({
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_KEY
});
