AlgoliaImpression.Views.ContactsEdit = Backbone.View.extend({

  template: JST["contacts/form"],

  render: function() {
    var content = this.template({
      contact: this.model
    });
    this.$el.html(content);

    return this;
  }
});
