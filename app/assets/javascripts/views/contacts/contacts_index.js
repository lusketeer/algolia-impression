AlgoliaImpression.Views.ContactsIndex = Backbone.CompositeView.extend({

  template: JST['contacts/index'],

  initialize: function() {
    this.listenTo(this.collection, "reset", this.doSomething);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    var contactsSearchView = new AlgoliaImpression.Views.ContactsSearch({
      collection: this.collection
    });
    this.addSubview(".contacts-search", contactsSearchView)
    return this;
  },

  doSomething: function() {
    console.log("collection has been changed");
  }

});
