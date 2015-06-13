require 'open-uri'
class Utility < ActiveRecord::Base

  # retreive geo info from google using address
  def self.get_geo_from_address(address)
    api_header = "https://maps.googleapis.com/maps/api/geocode/json?address="
    lookup_query = (api_header + address).gsub(/ /, "+")
    response = open(lookup_query).read
    location = JSON.parse(response)["results"].first["geometry"]["location"]
    location
  end
end
