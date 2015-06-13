AlgoliaImpression.Models.Contact = Backbone.Model.extend({

  addContact: function(callback) {
    AlgoliaImpression.index.addObject(this.attributes, function(err, content) {
      if (err) {
        console.log(err);
        return;
      } {
        callback();
      }
    })
  },

  editContact: function(callback) {
    AlgoliaImpression.index.saveObject(this.attributes, function(err, content) {
      if (err) {
        console.log(err);
        return;
      } else {
        callback();
      }
    });
  },

  getFullAddress: function() {
    return this.escape("address") + ", " + this.escape("city") + ", " + this.escape("state") + ", " + this.escape("zip").toString();
  }
});
