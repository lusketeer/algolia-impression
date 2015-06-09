AlgoliaImpression.Views.ContactsIndex = Backbone.CompositeView.extend({

  template: JST['contacts/index'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }

});
