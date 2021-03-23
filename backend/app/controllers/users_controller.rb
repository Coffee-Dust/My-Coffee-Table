class UsersController < ApplicationController

  def show
    run_block_or_render_error do
      user = User.find(params[:id])
      render json: UserSerializer.new(user).to_serialized_json
    end
  end

  def create
    user = User.new(user_params)

    validate_model_with_block_or_render_error(user) do
      # Raise error if it doesn't save so the rescue block can render the errors
      if user.save!
        render json: {success: "Successfuly created new User with id: #{user.id}"}
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :name)
  end
end
