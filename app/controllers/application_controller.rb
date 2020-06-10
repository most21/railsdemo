class ApplicationController < ActionController::Base
  #skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  skip_forgery_protection
  #protect_from_forgery with: :null_session
end
