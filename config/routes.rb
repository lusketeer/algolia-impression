Rails.application.routes.draw do

  get 'static/index'
  root to: "static#index"
  get 'utility/get_geo'

end
