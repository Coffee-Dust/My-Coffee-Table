class FancyLink < ApplicationRecord
  has_one :element, as: :elementable
end
