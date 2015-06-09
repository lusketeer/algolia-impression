window.AlgoliaImpression = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // set api connection
    var client = $.algolia.Client('LKTG08SGJT', '3faa658bc14a1feba5a24f9e5f9003f3');
    // set data destination
    AlgoliaImpression.index = client.initIndex('contacts');
    // set index setting
    AlgoliaImpression.index.setSettings(
      {
        'customRanking': ['desc(followers)']
      },

      function(err) {
        if (!err) {
          console.log('success');
        }
      }
    );
    // start backbone router
    new AlgoliaImpression.Routers.Contacts({
      // set root html element of the app
      $rootEl: $("#content")
    });
    // start backbone history
    Backbone.history.start();
  }
};

$(document).ready(function(){
  // initialize the app
  AlgoliaImpression.initialize();
});
