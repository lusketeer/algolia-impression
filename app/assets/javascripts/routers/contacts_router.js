AlgoliaImpression.Routers.Contacts = Backbone.Router.extend({
  routes: {
    "" : "contactsIndex"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection = new AlgoliaImpression.Collections.Contacts();

  },

  contactsIndex: function() {
    var contactsIndexView = new AlgoliaImpression.Views.ContactsIndex({
      collection: this.collection
    });
    this._swapView(contactsIndexView);
  }
});
