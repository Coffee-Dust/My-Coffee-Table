class CoffeeTable < ApplicationRecord
  validates_presence_of :user, :nickname
  belongs_to :user
end
