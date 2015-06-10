AlgoliaImpression.Views.ContactsList = Backbone.CompositeView.extend({
  template: JST["contacts/list"],

  initialize: function() {
    // refresh view when collection changes
    // make it more efficient when figure out .reset problem
    this.listenTo(this.collection, "reset", this.render);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function(contact) {
      var contactsListItemView = new AlgoliaImpression.Views.ContactsListItem({
        model: contact
      });
      this.addSubview(".contacts-list", contactsListItemView);
    }, this)
    return this;
  }
});
