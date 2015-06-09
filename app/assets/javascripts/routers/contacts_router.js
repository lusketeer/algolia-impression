AlgoliaImpression.Routers.Contacts = Backbone.Router.extend({
  routes: {
    "" : "contactsIndex"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection = new AlgoliaImpression.Collections.Contacts();

  },

  contactsIndex: function() {
    AlgoliaImpression.index.search("", function searchDone(err, content) {
      if (content.hits.length !== 0) {
        this.collection.set(content.hits);
        var contactsIndexView = new AlgoliaImpression.Views.ContactsIndex({
          collection: this.collection
        });

        this._swapView(contactsIndexView);

      } else {
        console.log(err);
      }
    }.bind(this));
  }
});
