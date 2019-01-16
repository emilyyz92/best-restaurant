class GoogleController < ApplicationController

  def nearby_search
    @lat_lng = get_location(params['address'])
    # google returns 20 results with a next_page_token if applicable
    resp = Faraday.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json') do |req|
      req.params = {
        'key': ENV['GOOGLE_KEY'],
        'location': @lat_lng,
        'rankby': 'distance',
        'keyword': params['keyword'],
        'type': 'restaurant',
      }
    end
    restaurants = JSON.parse(resp.body)['results']
    # save restaurant search results in db
    jsonRestaurants = []
    restaurants.each do |res|
      if(!Restaurant.exists?(google_id: res['id']))
        restaurant = Restaurant.create(
          name: res['name'],
          google_id: res['id'],
          location: "#{res['geometry']['location']['lat']},#{res['geometry']['location']['lng']}"
        )
      else
        restaurant = Restaurant.find_by(google_id: res['id'])
        restaurant.location = "#{res['geometry']['location']['lat']},#{res['geometry']['location']['lng']}"
        restaurant.name = res['name']
        restaurant.save
      end
      jsonRestaurants << restaurant
    end
    render json: jsonRestaurants
  end

  private

  #get lat & lng required by google map search using its geolocation api
  def get_location(address)
    resp = Faraday.get('https://maps.googleapis.com/maps/api/geocode/json') do |req|
      req.params = {
        'key': ENV['GOOGLE_KEY'],
        'address': address
      }
    end
    location = JSON.parse(resp.body)['results'][0]['geometry']['location']
    @lat_lng = "#{location['lat']},#{location['lng']}"
  end

end
