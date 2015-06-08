AlgoliaImpression.Routers.Contacts = Backbone.Router.extend({
  routes: {
    "" : "contactsIndex"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  contactsIndex: function() {
    var contactsIndexView = new AlgoliaImpression.Views.ContactsIndex();
    this._swapView(contactsIndexView);
  }
});
