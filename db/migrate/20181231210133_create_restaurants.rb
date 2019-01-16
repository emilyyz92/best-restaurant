class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :zip_code
      t.float :rating
      t.integer :review_count
      t.string :yelp_id

      t.timestamps
    end
  end
end
