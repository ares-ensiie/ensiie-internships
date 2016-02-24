# Ares for Meteor
Authenticate Ares users on your site.

## Usage
Just call in client-side `Meteor.loginWithAres()`

## Configuration

You have to set it with `service-configuration`

```
$ meteor add service-configuration
```

then add something like this to your server-side code.

```
ServiceConfiguration.configurations.remove({
  service: "ares"
});

ServiceConfiguration.configurations.insert({
  service: "ares",
  clientId: "{ your client id }",
  scope:'public',
  secret: "{ your app's secret }"
});
```
