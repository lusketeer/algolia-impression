AlgoliaImpression.Views.ContactsListItem = Backbone.View.extend({
  template: JST["contacts/list_item"],

  events: {
    "click .contact": "goToAddress"
  },

  initialize: function(options) {
    this.mapView = options.mapView;
  },

  render: function() {
    var content = this.template({
      contact: this.model
    });
    this.$el.html(content);
    this.$el.find("a.contact").data("id", this.model.get("objectID"));
    return this;
  },

  // Center map at clicked contact's location
  goToAddress: function(event) {
    event.preventDefault();
    this.mapView._map.panTo(this.model.get("_geoloc"));
    debugger
    this.mapView.search();
    console.log("move");
    $("input.contacts-search-box").val("");
  }
});
