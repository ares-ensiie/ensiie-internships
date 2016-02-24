Images = new FS.Collection("images", {
  stores: [new FS.Store.S3("images", {bucket: process.env.AWS_BUCKET,region: process.env.AWS_REGION})]
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
