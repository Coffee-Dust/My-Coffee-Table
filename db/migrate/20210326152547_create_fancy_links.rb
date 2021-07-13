class CreateFancyLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :fancy_links do |t|
      t.string :url
      t.string :textContent

      t.timestamps
    end
  end
end
