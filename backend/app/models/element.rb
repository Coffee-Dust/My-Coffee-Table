class Element < ApplicationRecord
  belongs_to :coffee_table
  belongs_to :style
  belongs_to :elementable, polymorphic: true
end
