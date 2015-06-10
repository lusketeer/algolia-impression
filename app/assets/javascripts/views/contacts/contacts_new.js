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

    this.model.set(data.contact);
    this.model.add(function() {
      if (this.model.get("_geoloc")) {
        // Re-center map to newly created contact
        this.mapView.initMap(this.model.get("_geoloc"));
      }
    }.bind(this));
  }
});
