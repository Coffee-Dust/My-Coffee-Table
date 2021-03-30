class CoffeeTable::ElementsController < ApplicationController
  def index

    run_block_or_render_error do
      elements = User.find(params[:user_id]).coffee_table.elements
      render json: ElementSerializer.new(elements).to_serialized_json
    end

  end

  def create
    element = Element.new(element_params)
    validate_model_with_block_or_render_error(element) do
      if element.save!
        render json: ElementSerializer.new(element).to_serialized_json
      end
    end
  end

  private

  def element_params
    type = params[:element][:elementable_type]
    params.require(:element).permit(
      :coffee_table_id,
      :className,
      :elementable_type,
      style_attributes: [:cssText],
      elementable_attributes: type.constantize.attribute_names
    )
  end

end
