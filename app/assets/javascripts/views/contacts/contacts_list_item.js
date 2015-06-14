AlgoliaImpression.Views.ContactsListItem = Backbone.View.extend({
  template: JST["contacts/list_item"],

  events: {
    "click .contact-title"  : "goToAddress",
    "mouseenter .contact"   : "bounceOnce",
    "click .edit-contact"   : "populateEditContactView"
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

  populateEditContactView: function(event) {
    console.log("it's here");
    $("#contact_modal").html("");
    var contactsEditView = new AlgoliaImpression.Views.ContactsEdit({
      model: this.model,
      mapView: this.mapView
    });
    $("#contact_modal").html(contactsEditView.render().$el);
  },

  // Center map at clicked contact's location
  goToAddress: function(event) {
    event.preventDefault();
    $("input.contacts-search-box").val("");
    // Trigger keyup event after setting input box value to company name
    // $("input.contacts-search-box").val(this.model.escape("company")).trigger("keyup");
    var marker = AlgoliaImpression._markers[this.model.get("objectID")];
    this.mapView._map.panTo(this.model.get("_geoloc"));
    // this.mapView._map.setZoom(15);
  },

  bounceOnce: function(event) {
    var marker = AlgoliaImpression._markers[this.model.get("objectID")];
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 750);
  }
});
