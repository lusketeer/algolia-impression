class UtilityController < ApplicationController
  def get_geo
    address = params["address"]
    geo = Utility.get_geo_from_address(address)
    render json: geo
  end
end
