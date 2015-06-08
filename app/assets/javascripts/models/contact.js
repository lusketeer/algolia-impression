AlgoliaImpression.Models.Contact = Backbone.Model.extend({

  add: function(attributes, options) {
    AlgoliaImpression.index.addObject(this.attributes, function(err, content) {
      console.log(err, content)
    })
  },

  update: function(attributes, options) {
    AlgoliaImpression.index.saveObject(this.attributes, function(err, content) {
      console.log(content);
    });
  }
});
