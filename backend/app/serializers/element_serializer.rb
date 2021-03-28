class ElementSerializer

  def self.options
    @@options = {
      only: [:id, :className, :elementable_type],
      include: {
        style: {
          except: [:id, :created_at, :updated_at]
        },
        elementable: {
          except: [:id, :created_at, :updated_at]
        }
      }
    }
  end

  def initialize(element, options=nil)
    @element = element
  end

  def to_serialized_json
    @element.to_json(@@options)
  end
end