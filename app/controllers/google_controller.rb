class GoogleController < ApplicationController

  def nearby_search
    @lat_lng = get_location(params['address'])
    current_res_list = Restaurant.find_nearby(@lat_lng)
    jsonRestaurants = current_res_list
    if current_res_list.count < 20
      google_results = Restaurant.google_the_rest(@lat_lng, current_res_list)
      if google_results.length > 0
        google_results.each do |res|
          restaurant = Restaurant.check_result(res)
          jsonRestaurants << restaurant
        end
      end
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
