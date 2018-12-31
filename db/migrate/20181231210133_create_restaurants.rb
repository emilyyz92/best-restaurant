class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :zip_code
      t.float :review
      t.integer :number_of_review

      t.timestamps
    end
  end
end
