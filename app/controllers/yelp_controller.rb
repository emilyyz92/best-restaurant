class YelpController < ApplicationController
  def get_details
    resp = call_search(params['name'], params['lat'], params['lng'])
    yelp_res = JSON.parse(resp.body)['businesses'][0]
    # check if it's the same restaurant between google and yelp
    if yelp_res && yelp_res['coordinates']['latitude'].to_f.round(2) == params['lat'].to_f.round(2) && yelp_res['coordinates']['longitude'].to_f.round(2) == params['lng'].to_f.round(2)
      @restaurant = Restaurant.find_by(google_id: params['googleid'])
    end
    if @restaurant
      @restaurant.save_yelp_info(yelp_res['review_count'], yelp_res['rating'], yelp_res['url'], yelp_res['id'])
      @restaurant.get_reviews
      # render json: @restaurant
    else
      render status: 500
    end
  end

  private

  #use yelp's business search api
  def call_search(name, lat, lng)
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

  def call_review(yelp_id)
    Faraday.get("https://api.yelp.com/v3/businesses/#{yelp_id}/reviews") do |req|
    end
  end
end
