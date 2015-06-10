AlgoliaImpression.Views.ContactsIndex = Backbone.CompositeView.extend({

  template: JST['contacts/index'],

  initialize: function() {
    // this.listenTo(this.collection, "remove", this.doSomething);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    var contactsNewView = new AlgoliaImpression.Views.ContactsNew();
    this.addSubview(".temp", contactsNewView);

    // // contact search view
    // var contactsSearchView = new AlgoliaImpression.Views.ContactsSearch({
    //   collection: this.collection
    // });
    // this.addSubview(".contacts-search", contactsSearchView)
    //
    // // map view
    // var mapsIndexView = new AlgoliaImpression.Views.MapsIndex({
    //   collection: this.collection
    // });
    // this.addSubview(".map", mapsIndexView);
    // mapsIndexView.initMap();
    //
    // // contact list view
    // var contactsListView = new AlgoliaImpression.Views.ContactsList({
    //   collection: this.collection,
    //   mapView: mapsIndexView
    // });
    // this.addSubview(".contacts-list-container", contactsListView);

    return this;
  },

  doSomething: function() {
    console.log("collection has been changed");
  }

});
