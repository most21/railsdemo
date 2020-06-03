class Api::CommentsController < ApplicationController
  respond_to :json

  #before_action :find_article

  def index
    respond_with Comment.all
  end

  def create
    #article = Article.find(params[:article_id])
    #@comment = @article.comments.create(comment_params)
    respond_with Comment.create(comment_params) #article.comments.create(comment_params)
    #redirect_to article_path(@article)
  end

  def destroy
    article = Article.find(params[:article_id])
    #@comment = @article.comments.find(params[:id])
    #@comment.destroy
    respond_with article.comments.destroy(params[:id])

    #redirect_to article_path(@article)
  end

  private
    def comment_params
      params.require(:comment).permit(:article_id, :commenter, :body, :user_id, :is_public)
    end

    # def find_article
    #   @article = Article.find(params[:article_id])
    # end
end
