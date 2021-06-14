class CreateFancyIframe < ActiveRecord::Migration[6.0]
  def change
    create_table :fancy_iframes do |t|
      t.string :title
      t.string :caption
      t.string :width
      t.string :height
      t.string :src
      t.string :html_allow_attributes
      t.timestamps
    end
  end
end
