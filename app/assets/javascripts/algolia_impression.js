window.AlgoliaImpression = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var client = $.algolia.Client('LKTG08SGJT', '3faa658bc14a1feba5a24f9e5f9003f3');
    AlgoliaImpression.index = client.initIndex('contacts');
    AlgoliaImpression.index.search('john', function searchDone(err, content) {
      var contacts = new AlgoliaImpression.Collections.Contacts(content.hits)
      console.log(content)
    });
    new AlgoliaImpression.Routers.Contacts({
      $rootEl: $("#content")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  AlgoliaImpression.initialize();
});
