class UserSerializer
  def initialize(user, options=nil)
    @user = user
  end

  def to_serialized_json
    options = {
      only: [:id, :name, :email, :created_at]
    }
    @user.to_json(options)
  end
end