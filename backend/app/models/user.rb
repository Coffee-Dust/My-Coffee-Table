class User < ApplicationRecord
  validates_presence_of :name, :email

  has_one :coffee_table
end
