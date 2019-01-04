class GoogleController < ApplicationController
  def get_location
    resp = Faraday.get('https://maps.googleapis.com/maps/api/geocode/json') do |req|
      req.params = {
        'key': ENV['GOOGLE_KEY'],
        'address': params['address']
      }
    end
    location = resp.body['results'][0]['geometry']['location']
    lat_long = "#{location['lat']},#{location['lng']}"
    return lat_long
  end

  def nearby_search
    resp = Faraday.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json') do |req|
      req.params = {
        'key': ENV['GOOGLE_KEY'],
        'location': params['location'],
        'rankby': 'distance',
        'keyword': params['keyword'],
        'type': 'restaurant',
      }
    end
    restaurants = resp.body['results']
  end
end
