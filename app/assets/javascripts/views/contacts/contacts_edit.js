AlgoliaImpression.Views.ContactsEdit = Backbone.View.extend({

  template: JST["contacts/form"],

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
  }
});
