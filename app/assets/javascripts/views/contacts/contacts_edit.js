AlgoliaImpression.Views.ContactsEdit = Backbone.View.extend({

  template: JST["contacts/form"],

  events: {
    "click button.submit"         : "updateContact",
    "click button.delete-contact" : "destroyContact"
  },

  initialize: function(options) {
    if (options) {
      this.mapView = options.mapView;
    }
  },

  render: function() {
    var content = this.template({
      contact: this.model
    });
    this.$el.html(content);
    this.$("h4.modal-title").html("Edit Contact");
    this.$("button.submit").html("Update Contact");

    return this;
  },

  updateContact: function(event) {
    event.preventDefault();
    var data = $("form.contact-form").serializeJSON();
    // get geo loc for the address
    this.model.set(data);
    // see if any part of address has changed
    var addressChanged = this.model.hasChanged("address") || this.model.hasChanged("city") || this.model.hasChanged("county") || this.model.hasChanged("state") || this.model.hasChanged("zip");
    var currentContact = this.model;
    var mapView = this.mapView;
    if (addressChanged) {
      var address = this.model.get("address") + ", " + this.model.get("city") + ", " + this.model.get("state") + ", " + this.model.get("zip")
      address = address.split(" ").join("+");
      $.get("/utility/get_geo?address=" + address, function(data) {
        currentContact.set({
          _geoloc: data
        });

        currentContact.editContact(function() {
          $("#contact_modal").modal("hide");
          $("body").removeClass("modal-open");
          if (currentContact.get("_geoloc")) {
            // Re-center map to newly created contact
            mapView._map.panTo(currentContact.get("_geoloc"));
          }
        });
      });
    } else {
      currentContact.editContact(function() {
        $("#contact_modal").modal("hide");
        $("body").removeClass("modal-open");
        if (currentContact.get("_geoloc")) {
          // Re-center map to newly created contact
          mapView._map.panTo(currentContact.get("_geoloc"));
        }
      });
    }
  },

  destroyContact: function(event) {
    event.preventDefault();
    this.model.deleteContact(function() {
      $("#contact_modal").modal("hide");
      $("body").removeClass("modal-open");
      window.location = "/";
      console.log("it's deleted");
    });
  }
});
