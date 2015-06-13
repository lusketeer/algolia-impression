AlgoliaImpression.Models.Contact = Backbone.Model.extend({

  addContact: function(callback) {
    AlgoliaImpression.index.addObject(this.attributes, function(err, content) {
      if (err) {
        // Print out errors if there are some
        console.log(err);
      } {
        callback();
      }
    })
  },

  update: function(callback) {
    AlgoliaImpression.index.saveObject(this.attributes, function(err, content) {
      console.log(err, content);
    });
  },

  getFullAddress: function() {
    return this.escape("address") + ", " + this.escape("city") + ", " + this.escape("state") + ", " + this.escape("zip").toString();
  }
});
