class User < ApplicationRecord
  validates_presence_of :name, :email

  has_one :coffee_table

  def initialize(hash)
    super(hash)
    self.build_coffee_table
  end
end
