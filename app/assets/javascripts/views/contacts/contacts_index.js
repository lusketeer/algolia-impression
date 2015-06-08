AlgoliaImpression.Views.ContactsIndex = Backbone.View.extend({

  template: JST['contacts/index'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }

});
