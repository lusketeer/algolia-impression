// retrieve geo data from google (can't do cross site :( it doesn't work now)
function getGeoFromAddress(address) {
  var apiHeader = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var lookupQuery = (apiHeader + address).split(" ").join("+");
  var data = $.get(lookupQuery);
  var geo = data.responseJSON["results"][0]["geometry"]["location"];
  return geo;
}

// parse query=ny&page=1 into javascript object
function parseString(str) {
  var result = {};
  _.each(str.split("&"), function(pair) {
    var pairArr = pair.split("=");
    result[pairArr[0]] = pairArr[1];
  });

  return result;
}
