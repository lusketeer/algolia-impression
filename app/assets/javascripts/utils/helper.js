function getGeoFromAddress(address) {
  var apiHeader = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var lookupQuery = (apiHeader + address).split(" ").join("+");
  var data = $.get(lookupQuery);
  var geo = data.responseJSON["results"][0]["geometry"]["location"];
  return geo;
}
