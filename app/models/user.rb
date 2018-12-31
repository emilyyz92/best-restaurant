class User < ApplicationRecord
  has_secure_password
  has_many :user_restaurants
  has_many :restaurants, through: :user_restaurants
end
