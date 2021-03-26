class AddClassNameToElements < ActiveRecord::Migration[6.0]
  def change
    add_column :elements, :className, :string
  end
end
