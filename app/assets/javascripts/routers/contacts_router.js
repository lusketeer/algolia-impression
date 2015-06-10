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
        debugger
        if (content && content.hits.length !== 0) {
          // set result to collection's models
          this.collection.set(content.hits);

          // rendering the view

        } else {
          console.log(err);
          this.collection.set([]);
        }
        var contactsIndexView = new AlgoliaImpression.Views.ContactsIndex({
          collection: this.collection
        });
        this._swapView(contactsIndexView);
      }.bind(this)
    );
  }
});
