AlgoliaImpression.Views.ContactsIndex = Backbone.CompositeView.extend({

  template: JST['contacts/index'],

  events: {
    "click a.new-contact": "populateNewContactView"
  },

  initialize: function() {
    // this.listenTo(this.collection, "remove", this.doSomething);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    // map view
    var mapsIndexView = new AlgoliaImpression.Views.MapsIndex({
      collection: this.collection
    });
    this.mapView = mapsIndexView;
    this.addSubview(".map", mapsIndexView);
    mapsIndexView.initMap();

    // contact search view
    var contactsSearchView = new AlgoliaImpression.Views.ContactsSearch({
      collection: this.collection
    });
    this.addSubview(".contacts-search", contactsSearchView)

    // contact list view
    var contactsListView = new AlgoliaImpression.Views.ContactsList({
      collection: this.collection,
      mapView: mapsIndexView
    });
    this.addSubview(".contacts-list-container", contactsListView);

    return this;
  },

  populateNewContactView: function(event) {
    $("#contact_modal").html("");
    var contactsNewView = new AlgoliaImpression.Views.ContactsNew({
      mapView: this.mapView
    });
    this.addSubview("#contact_modal", contactsNewView);
  },

  doSomething: function() {
    console.log("collection has been changed");
  }

});
