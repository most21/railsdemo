class Api::CommentsController < ApplicationController
  respond_to :json

  #before_action :find_article

  # def index
  #   @comments = Comment.all
  #   respond_with @comments
  # end

  # def show
  #   puts params[:id]
  #   @article = Article.find(params[:id])
  #   puts @article
  #   @comments = @article.comments
  #   respond_with :api, @comments
  # end

  def create
    #article = Article.find(params[:article_id])
    #@comment = @article.comments.create(comment_params)
    @comment = Comment.create(comment_params)
    @comment.user_id = current_user.id.to_i
    @comment.save
    respond_with :api, :article, @comment #article.comments.create(comment_params)
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
      params.require(:comment).permit(:article_id, :commenter, :body, :is_public)
    end

    # def find_article
    #   @article = Article.find(params[:article_id])
    # end
end
