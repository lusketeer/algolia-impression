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

  // Use current map boundary to search for contacts that exist within the current map view
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

        AlgoliaImpression.responseContent = content;
        this.collection.set(content.hits);
      }.bind(this)
    );
  },

  // Add marker to global markers hash and place it on the map
  placeMarker: function(contact) {
    // avoid duplications
    if (AlgoliaImpression._markers[contact.get("objectID")]) { return };

    // initialize marker with contact's geoloc
    var marker = new google.maps.Marker({
      position: { lat: contact.get('_geoloc').lat, lng: contact.get('_geoloc').lng },
      map: this._map,
      title: contact.get('objectID'),
      animation: google.maps.Animation.DROP
    });

    var view = this;
    // enable click event for marker to display information
    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    // store to markers hash for deletion later
    AlgoliaImpression._markers[contact.get("objectID")] = marker;
  },

  // Show marker information when clicked
  showMarkerInfo: function(event, marker) {
    var contact = this.collection.findWhere({ objectID: marker.title });
    var contentCompany = "<a href='" + contact.escape("web") + "' target='_blank'>" + contact.escape("company") + "</a>";
    var contentStreet = contact.escape("address");
    var contentAddressRest = contact.escape("city") + ", " + contact.escape("state") + " " + contact.escape("zip");
    var contentContact = contact.escape("firstname") + " " + contact.escape("lastname");
    var contentPhone = "<a href='tel:" + contact.escape("phone") + "'>" + "<span class='glyphicon glyphicon-earphone'></span>" + "</a>";
    var contentEmail = "<a href='mailto:" + contact.escape("email") + "'>" + "<span class='glyphicon glyphicon-envelope'></span>" + "</a>";
    var contentString = "<div>" +
        "<h4>" + contentCompany + "</h4>" +
        contentStreet + "<br>" +
        contentAddressRest + "<br>" +
      "</div>";
    contentString += "<div>" +
        "<h5>" + contentContact + "</h5>" +
        contentPhone + "&nbsp;&nbsp;" + contentEmail +
      "</div>"
    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    infoWindow.open(this._map, marker);
  },

  // remove marker from the map and global markers hash
  removeMarker: function (contact) {
    var marker = AlgoliaImpression._markers[contact.get("objectID")];
    marker.setMap(null);
    delete AlgoliaImpression._markers[contact.get("objectID")];
  }

  // toggleBounce: function(id) {
  //   var marker = AlgoliaImpression._markers[id];
  //
  //   if (marker.getAnimation() != null) {
  //     marker.setAnimation(null);
  //   } else {
  //     marker.setAnimation(google.maps.Animation.BOUNCE);
  //   }
  // },
  //
  // startBounce: function (id) {
  //   var marker = AlgoliaImpression._markers[id];
  //   marker.setAnimation(google.maps.Animation.BOUNCE);
  // },
  //
  // stopBounce: function (id) {
  //   var marker = AlgoliaImpression._markers[id];
  //   marker.setAnimation(null);
  // }
});
