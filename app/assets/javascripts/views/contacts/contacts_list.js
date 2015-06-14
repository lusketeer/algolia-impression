AlgoliaImpression.Views.ContactsList = Backbone.CompositeView.extend({
  template: JST["contacts/list"],

  events: {
    // "mouseenter .contact": "startBounce",
    // "mouseleave .contact": "stopBounce"
    // "hover .contact": "toggleBounce"
    "click a.more-contacts": "loadAdditionalContacts"
  },

  initialize: function(options) {
    // refresh view when collection changes
    // make it more efficient when figure out .reset problem
    this.listenTo(this.collection, "add remove", this.render);
    this.mapView = options.mapView;
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function(contact) {
      var contactsListItemView = new AlgoliaImpression.Views.ContactsListItem({
        model       : contact,
        collection  : this.collection,
        mapView     : this.mapView
      });
      this.addSubview(".contacts-list", contactsListItemView);
    }, this)

    return this;
  },

  loadAdditionalContacts: function(event) {
    event.preventDefault();
    $(event.currentTarget).find("div").html("Loading...");
    $("*").css("cursor", "progress");
    var nextPage = AlgoliaImpression.responseContent.page + 1;
    var query = AlgoliaImpression.responseContent.query;

    // When user isn't searching
    if (query === "") {
      var params = AlgoliaImpression.responseContent.params;
      var data = parseString(params);
      AlgoliaImpression.index.search(
        {
          page: nextPage,
          insideBoundingBox: data.insideBoundingBox.split("%2C").join(",")
        },
        function(err, content) {
          if (err) {
            console.log(err);
            return;
          }
          AlgoliaImpression.responseContent = content;
          this.collection.add(content.hits);
          $("*").css("cursor", "initial");
        }.bind(this)
      )
    } else {
      // When user is searching
      AlgoliaImpression.index.search(
        query,
        {
          page: nextPage
        },
        function(err, content) {
          if (err) {
            console.log(err);
            return;
          }
          AlgoliaImpression.responseContent = content;
          this.collection.add(content.hits);
          $("*").css("cursor", "initial");
        }.bind(this)
      )
    }
  }


});
