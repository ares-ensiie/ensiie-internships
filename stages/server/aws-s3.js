Images = new FS.Collection("images", {
  stores: [new FS.Store.S3("images", {bucket: "karrde-test",region: "eu-central-1"})]
});


Images.allow({
  'insert': function () {
    return true;
  },
  'update': function () {
    return true;
  },
  download: function(userId, fileObj) {
        return true
  }
});
