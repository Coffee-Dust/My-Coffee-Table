class CreateElements < ActiveRecord::Migration[6.0]
  def change
    create_table :elements do |t|
      t.integer :coffee_table_id
      t.integer :style_id
      t.string :elementable_type
      t.integer :elementable_id

      t.timestamps
    end
  end
end
