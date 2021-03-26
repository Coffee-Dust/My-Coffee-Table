require 'test_helper'

class ElementTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "Can have polymorphic child" do
    c = CoffeeTable.create!(user: User.create!(name: "lol", email: "idk"))
    e = c.elements.build()
    l = FancyLink.create!(url:"face")
    s = e.build_style(cssText: "lol")
    e.elementable = l
    c.save!
    assert e.elementable.url == "face"
  end
end
