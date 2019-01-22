# require 'capybara/dsl'
require 'geokit'
require 'csv'

class Restaurant < ApplicationRecord
  has_many :user_restaurants
  has_many :users, through: :user_restaurants

  def save_yelp_info(review_count, rating, yelp_url, yelp_id)
    self.review_count = review_count
    self.rating = rating
    self.yelp_url = yelp_url
    self.yelp_id = yelp_id
    self.save
  end

  def self.get_restaurant_list
    list = []
    CSV.foreach("#{Rails.root}/app/assets/grab_and_go.csv") do |row|
      list << row[0]
    end
    return list
  end

  def self.get_restaurant_info(res_name)
    res_menu = ""
    CSV.foreach("#{Rails.root}/app/assets/grab_and_go.csv") do |row|
      if row[0] == res_name
        res_menu = row[1]
        break
      end
    end
    return res_menu
  end

  # find nearby restaurants in database
  def self.find_nearby(user_location)
    current_res = self.all.select do |res|
      if res.location
        self.get_distance(user_location, res.location) <= 2
      else
        false
      end
    end
  end

  # make google request for names that's not yet in database nearby
  def self.google_the_rest(user_lat_lng, current_res_list)
    google_results = []
    self.res_to_be_searched(user_lat_lng, current_res_list).each do |res_name|
      resp = self.google_nearby(user_lat_lng, res_name)
      results = JSON.parse(resp.body)['results']
      result = results[0]
      if results.length > 0
        result_location = results[0]['geometry']['location']
        result_lat_lng = "#{result_location['lat']},#{result_location['lng']}"
        if self.get_distance(result_lat_lng, user_lat_lng) <= 2
          google_results << result
        end
      end
    end
    google_results
  end

  def self.check_result(res)
    if(!self.exists?(google_id: res['id']))
      restaurant = Restaurant.create(
        name: res['name'],
        google_id: res['id'],
        logo_url: res['icon'],
        location: "#{res['geometry']['location']['lat']},#{res['geometry']['location']['lng']}"
      )
    else
      restaurant = self.find_by(google_id: res['id'])
      restaurant.location = "#{res['geometry']['location']['lat']},#{res['geometry']['location']['lng']}"
      restaurant.name = res['name']
    end
    restaurant.menu_url = self.get_restaurant_info(res['name'].downcase)
    restaurant.save
    return restaurant
  end

  private

  # return a list of res names that's not in db near this location
  def self.res_to_be_searched(location, current_res_list)
    self.get_restaurant_list.select{|res| !current_res_list.any? { |c| c.name == res }}
  end

  def self.google_nearby(lat_lng, keyword)
    Faraday.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json') do |req|
      req.params = {
        'key': ENV['GOOGLE_KEY'],
        'location': lat_lng,
        'keyword': keyword,
        'radius': '3000'
      }
    end
  end

  def self.get_distance(location1, location2)
    first = Geokit::LatLng.from_string(location1)
    second = Geokit::LatLng.from_string(location2)
    first.distance_to(second)
  end



  # def get_reviews(yelp_alias)
  #   Capybara.current_driver = :selenium
  #   yelp = "https://www.yelp.com"
  #   Capybara.app_host = yelp
  #   Capybara.run_server = false
  #   Capybara.register_driver :selenium do |app|
  #     Capybara::Selenium::Driver.new(app, :browser => :chrome)
  #   end
  #   Capybara.visit("#{yelp}/biz/#{yelp_alias}")
  #   review_lists = Capybara.all('.review-content')
  # end
end
