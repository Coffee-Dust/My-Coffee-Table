class CreateCoffeeTables < ActiveRecord::Migration[6.0]
  def change
    create_table :coffee_tables do |t|
      t.string :nickname
      t.integer :user_id

      t.timestamps
    end
  end
end
