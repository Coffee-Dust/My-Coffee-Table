class CoffeeTable::ElementsController < ApplicationController
  def index

    run_block_or_render_error do
      elements = User.find(params[:user_id]).coffee_table.elements
      render json: ElementSerializer.new(elements).to_serialized_json
    end

  end

end
