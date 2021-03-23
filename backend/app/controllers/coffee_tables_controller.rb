class CoffeeTablesController < ApplicationController

  def show
    run_block_or_render_error do
      coffee_table = User.find(params[:user_id]).coffee_table
      render json: CoffeeTableSerializer.new(coffee_table).to_serialized_json
    end
  end

end
