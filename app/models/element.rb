class Element < ApplicationRecord
  belongs_to :coffee_table
  belongs_to :style
  belongs_to :elementable, polymorphic: true

  accepts_nested_attributes_for :style

  def elementable_attributes=(attributes)
    self.elementable = self.elementable_type.constantize.new(attributes)
  end

end
