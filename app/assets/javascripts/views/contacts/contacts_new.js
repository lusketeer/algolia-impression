AlgoliaImpression.Views.ContactsNew = Backbone.View.extend({

  template: JST["contacts/form"],

  initialize: function(options) {
    this.mapView = options.mapView;
    this.model = new AlgoliaImpression.Models.Contact();
  },

  render: function() {
    var content = this.template({
      contact: this.model
    });
    this.$el.html(content);

    return this;
  }
});
