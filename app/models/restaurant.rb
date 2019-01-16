class Restaurant < ApplicationRecord
  has_many :user_restaurants
  has_many :users, through: :user_restaurants

  def save_yelp_info(review_count, rating, yelp_url)
    self.review_count = review_count
    self.rating = rating
    self.yelp_url = yelp_url
    self.save
  end
end
