AlgoliaImpression.Models.Contact = Backbone.Model.extend({

  add: function() {
    AlgoliaImpression.index.addObject(this.attributes, function(err, content) {
      console.log(err, content)
    })
  },

  update: function() {
    AlgoliaImpression.index.saveObject(this.attributes, function(err, content) {
      console.log(err, content);
    });
  }
});
