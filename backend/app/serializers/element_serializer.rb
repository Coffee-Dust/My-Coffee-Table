class ElementSerializer
  def initialize(element, options=nil)
    @element = element
  end

  def to_serialized_json
    options = {
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
    @element.to_json(options)
  end
end