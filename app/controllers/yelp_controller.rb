class YelpController < ApplicationController
  def get_reviews
    resp = call_yelp_api(params['name'], params['lat'], params['lng'])
    yelp_res = JSON.parse(resp.body)['businesses'][0]
    # check if it's the same restaurant between google and yelp
    if yelp_res && yelp_res['coordinates']['latitude'].to_f.round(2) == params['lat'].to_f.round(2) && yelp_res['coordinates']['longitude'].to_f.round(2) == params['lng'].to_f.round(2)
      @restaurant = Restaurant.find_by(google_id: params['googleid'])
      # save to db
      @restaurant.save_yelp_info(yelp_res['review_count'], yelp_res['rating'], yelp_res['url'])
    end
    render json: @restaurant
  end

  private

  #use yelp's business search api
  def call_yelp_api(name, lat, lng)
    Faraday.get('https://api.yelp.com/v3/businesses/search') do |req|
      req.headers = {
        'Authorization': "Bearer #{ENV['YELP_KEY']}"
      }
      req.params = {
        'term': name,
        'latitude': lat,
        'longitude': lng
      }
    end
  end
end
