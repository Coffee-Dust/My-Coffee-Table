class ApplicationController < ActionController::API

  def run_block_or_render_error(custom_msg=nil)
    begin
      yield
    rescue => exception
      render json: {
        error: custom_msg ? "#{custom_msg}:  #{exception}" : "#{exception}", 
        backtrace: exception.backtrace.first(5)
      }, status: 569
    end
  end

  def validate_model_with_block_or_render_error(model)
    begin
      yield
    rescue => exception
      render json: {
        errors: {
          messages: model.errors.messages,
          full_messages: model.errors.full_messages
        }
      }.merge(model.attributes), status: 569
    end
  end
end
