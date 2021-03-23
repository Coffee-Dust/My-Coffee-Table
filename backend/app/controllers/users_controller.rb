class UsersController < ApplicationController
  def show
    run_block_or_render_error do
      user = User.find(params[:id])
      render json: UserSerializer.new(user).to_serialized_json
    end
  end
  def create

  end
end
