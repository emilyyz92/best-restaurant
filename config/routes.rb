Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/api/google/search', to: 'google#nearby_search'
  patch '/api/yelp/search', to: 'yelp#get_details'
  get '/api/google/location', to: 'google#get_coordinates'
end
