class FancyIframe < ApplicationRecord
  has_one :element, as: :elementable
end