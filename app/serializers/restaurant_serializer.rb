class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :rating, :review_count, :location, :google_id, :yelp_id, :yelp_url, :logo_url, :menu_url
end
