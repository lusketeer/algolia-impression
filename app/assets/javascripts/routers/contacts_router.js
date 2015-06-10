AlgoliaImpression.Routers.Contacts = Backbone.Router.extend({
  routes: {
    "" : "contactsIndex"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection = new AlgoliaImpression.Collections.Contacts();

  },

  contactsIndex: function() {
    // populate contacts collection upon initializing index view
    // Default to San Francisco
    AlgoliaImpression.index.search({
        aroundLatLng: '37.7833,-122.4167',
        aroundRadius: 10000 // 10km around
      },
      function searchDone(err, content) {
        if (content.hits.length !== 0) {
          // set result to collection's models
          this.collection.set(content.hits);
          var contactsIndexView = new AlgoliaImpression.Views.ContactsIndex({
            collection: this.collection
          });

          // rendering the view
          this._swapView(contactsIndexView);

        } else {
          console.log(err);
        }
      }.bind(this)
    );
  }
});
