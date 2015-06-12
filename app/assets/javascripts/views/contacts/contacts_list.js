AlgoliaImpression.Views.ContactsList = Backbone.CompositeView.extend({
  template: JST["contacts/list"],

  events: {
    // "mouseenter .contact": "startBounce",
    // "mouseleave .contact": "stopBounce"
    // "hover .contact": "toggleBounce"
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
        model   : contact,
        mapView : this.mapView
      });
      this.addSubview(".contacts-list", contactsListItemView);
    }, this)

    this.$("span.contacts-list-count").html(this.collection.size());
    if (this.collection.size() === 0) {
      this.$(".panel-container").addClass("panel-warning");
    } else {
      this.$(".panel-container").addClass("panel-success");
    }

    return this;
  },

  toggleBounce: function(event) {
    var id = $(event.currentTarget).data('id');
    this.mapView.toggleBounce(id);
  },

  // initiating bouncing animation for the hovered marker
  startBounce: function(event) {
    var id = $(event.currentTarget).data('id');
    this.mapView.startBounce(id);
    console.log("enter");
  },

  // terminating bouncing animation when mouse exits the contact
  stopBonuce: function(event) {
    var id = $(event.currentTarget).data('id');
    this.mapView.stopBounce(id);
    console.log("leave");
  }


});
