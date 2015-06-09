AlgoliaImpression.Views.ContactsSearch = Backbone.View.extend({
  template: JST["contacts/search"],

  events: {
    "keyup input.contacts-search-box" : "searchResponse"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  searchResponse: function(event) {
    event.preventDefault();
    var searchContent = $("input.contacts-search-box").val();
    AlgoliaImpression.index.search(searchContent, function searchDone(err, content) {
      this.collection.reset(content.hits);
      console.log(content.hits.length);
    }.bind(this))
  }
});
