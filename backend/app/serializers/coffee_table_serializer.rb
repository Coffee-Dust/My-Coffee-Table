class CoffeeTableSerializer

  def initialize(coffee_table, options=nil)
    @coffee_table = coffee_table
  end

  def to_serialized_json
    options = {
      only: [:id, :nickname, :background_type],
      include: {
        user: {
          only: [:id]
        }
      }
    }

    @coffee_table.to_json(options)
  end

end