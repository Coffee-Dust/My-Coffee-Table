class SessionsController < ApplicationController
  def create
    if user = User.find_by(email: params[:email])
      render json: UserSerializer.new(user).to_serialized_json
    else
      render json: {
        errors: {
          full_messages: ["Could not find user with that email!"]
        }
      }
    end
  end
end
