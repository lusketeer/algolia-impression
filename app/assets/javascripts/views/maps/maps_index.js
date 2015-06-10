AlgoliaImpression.Views.MapsIndex = Backbone.View.extend({

  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    AlgoliaImpression._markers = {};

    this.listenTo(this.collection, 'add', this.placeMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  initMap: function(newCenter) {
    var centerDefault = {
      lat: 37.7833,
      lng: -122.4167
    };

    if (newCenter !== undefined) {
      centerDefault = newCenter;
    }

    var mapOptions = {
     center: centerDefault,
     zoom: 12
    };

   this._map = new google.maps.Map(this.el, mapOptions);
   this.collection.each(this.placeMarker.bind(this));
   this.attachMapListeners();
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
  },

  search: function() {
    // Get map boundary
    var mapBounds = this._map.getBounds();
    var ne = mapBounds.getNorthEast();
    var sw = mapBounds.getSouthWest();

    // set up filtering criteria
    // var filterData = {
    //   lat: [sw.lat(), ne.lat()],
    //   lng: [sw.lng(), ne.lng()]
    // };

    var filterData = sw.lat().toString() + "," + sw.lng().toString() + "," + ne.lat().toString() + "," + ne.lng().toString();

    AlgoliaImpression.index.search({
        insideBoundingBox: filterData
      },
      function(err, content) {
        if (err) {
          console.error(err);
          return;
        }

        this.collection.set(content.hits);
      }.bind(this)
    );
  },

  placeMarker: function(contact) {
    // avoid duplications
    if (AlgoliaImpression._markers[contact.get("objectID")]) { return };

    // initialize marker with contact's geoloc
    var marker = new google.maps.Marker({
      position: { lat: contact.get('_geoloc').lat, lng: contact.get('_geoloc').lng },
      map: this._map,
      title: contact.get('company')
    });

    var view = this;
    // enable click event for marker to display information
    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    // store to markers hash for deletion later
    AlgoliaImpression._markers[contact.get("objectID")] = marker;
  },

  showMarkerInfo: function(event, marker) {
   var contentString = "<strong>" + marker.title + "</strong>";
   var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    infoWindow.open(this._map, marker);
  },

  removeMarker: function (contact) {
    var marker = AlgoliaImpression._markers[contact.get("objectID")];
    marker.setMap(null);
    delete AlgoliaImpression._markers[contact.get("objectID")];
  },

  startBounce: function (id) {
    var marker = AlgoliaImpression._markers[id];
    marker.setAnimation(google.maps.Animation.BOUNCE);
  },

  stopBounce: function (id) {
    var marker = AlgoliaImpression._markers[id];
    marker.setAnimation(null);
  }

});
