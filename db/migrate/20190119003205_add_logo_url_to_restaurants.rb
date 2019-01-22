class AddLogoUrlToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :menu_url, :string
    add_column :restaurants, :logo_url, :string
  end
end
