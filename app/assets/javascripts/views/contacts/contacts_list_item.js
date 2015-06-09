AlgoliaImpression.Views.ContactsListItem = Backbone.View.extend({
  template: JST["contacts/list_item"],

  tagName: "li",

  render: function() {
    var content = this.template({
      contact: this.model
    });
    this.$el.html(content);
    return this;
  }
});
