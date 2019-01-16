class AddYelpUrlToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :yelp_url, :string
  end
end
