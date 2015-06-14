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
        AlgoliaImpression.responseContent = content;
        if (content && content.hits.length !== 0) {
          // set result to collection's models
          this.collection.set(content.hits);

        } else {
          console.log(err);
          alert("Unable to establish connection with API Server");
          return;
        }
        var contactsIndexView = new AlgoliaImpression.Views.ContactsIndex({
          collection: this.collection
        });
        // rendering the view
        this._swapView(contactsIndexView);
      }.bind(this)
    );
  }
});
