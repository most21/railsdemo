class WelcomeController < ApplicationController
  skip_before_action :find_article, only: [:index] # can this just be :index, or does it still need to be a list?

  def index
  end
end
