AlgoliaImpression.Collections.Contacts = Backbone.Collection.extend({

  model: AlgoliaImpression.Models.Contact,

  initialize: function() {
    // AlgoliaImpression.index.search("", function searchDone(err, content) {
    //   if (content.hits.length !== 0) {
    //     this.set(content.hits);
    //   } else {
    //     console.log(err);
    //   }
    // }.bind(this));
  }
});
