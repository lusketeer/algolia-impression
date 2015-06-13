AlgoliaImpression.Models.Contact = Backbone.Model.extend({

  addContact: function(callback) {
    AlgoliaImpression.index.addObject(this.attributes, function(err, content) {
      if (err) {
        console.log(err);
        return;
      } else {
        if (callback) {
          callback();
        }
      }
    })
  },

  editContact: function(callback) {
    AlgoliaImpression.index.saveObject(this.attributes, function(err, content) {
      if (err) {
        console.log(err);
        return;
      } else {
        if (callback) {
          callback();
        }
      }
    });
  },

  deleteContact: function(callback) {
    AlgoliaImpression.index.deleteObject(this.get("objectID"), function(err) {
      if (err) {
        console.log(err);
        return;
      } else {
        if (callback) {
          callback();
        }
      }
    });
  },

  getFullAddress: function() {
    return this.escape("address") + ", " + this.escape("city") + ", " + this.escape("state") + ", " + this.escape("zip").toString();
  }
});
