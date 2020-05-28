class ApplicationController < ActionController::Base
  before_action :find_article

  private
    def find_article
      @article = Article.find(params[:id])
    end
end
