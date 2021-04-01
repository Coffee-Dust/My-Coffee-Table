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

  def update

    element = User.find(params[:user_id]).coffee_table.elements.where(id: params[:id])[0]

    validate_model_with_block_or_render_error(element) do

      if elementable_params = element_params[:elementable_attributes]
        element.elementable.update!(elementable_params)
      end
      
      if style_params = element_params[:style_attributes]
        element.style.update!(style_params)
      end

      if class_name = element_params[:className]
        element.className = class_name
      end

      if element.save!
        render json: ElementSerializer.new(element).to_serialized_json
      end
      
    end
  end

  def destroy
    run_block_or_render_error do
      element = User.find(params[:user_id]).coffee_table.elements.where(id: params[:id])[0]
      json = ElementSerializer.new(element).to_serialized_json
      if element.delete
        render json: json
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
      elementable_attributes: type ? type.constantize.attribute_names : []
    )
  end

end
