AlgoliaImpression.Views.ContactsNew = Backbone.View.extend({

  template: JST["contacts/form"],

  events: {
    "click button.submit": "createContact"
  },

  initialize: function(options) {
    if (options) {
      this.mapView = options.mapView;
    }
    this.model = new AlgoliaImpression.Models.Contact();
  },

  render: function() {
    var content = this.template({
      contact: this.model
    });
    this.$el.html(content);
    this.$("h4.modal-title").html("New Contact");
    this.$("button.submit").html("Create Contact");

    return this;
  },

  createContact: function(event) {
    event.preventDefault();
    var data = $("form.contact-form").serializeJSON();
    // get geo loc for the address
    this.model.set(data);
    var address = this.model.get("address") + ", " + this.model.get("city") + ", " + this.model.get("state") + ", " + this.model.get("zip")
    var newContact = this.model;
    var mapView = this.mapView;
    // replace empty space with + before post to utility controller
    address = address.split(" ").join("+");
    $.get("/utility/get_geo?address=" + address, function(data) {
      newContact.set({
        _geoloc: data
      });

      newContact.addContact(function() {
        if (newContact.get("_geoloc")) {
          // Re-center map to newly created contact
          mapView._map.panTo(newContact.get("_geoloc"));
        }
      });
    });
  }
});
