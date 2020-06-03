class Api::ArticlesController < ApplicationController
  #before_action :find_article, except: [:index, :new, :create]
  respond_to :json

  def index
    @articles = Article.all
    #render 'articles/index.json.jbuilder'
    respond_with @articles
  end

  def show
    @article = Article.find(params[:id])
    #respond_with Article.find(params[:id])
    #render 'articles/show.json.jbuilder'
    respond_with @article
  end

  def new
    respond_with Article.new
  end

  def edit
    respond_with Article.find(params[:id])
  end

  def create
    #@article = Article.new(article_params)
    #a = Article.create(article_params)
    #a.user_id = current_user.id
    respond_with :api, Article.create(article_params)

    # if @article.save
    #   redirect_to @article
    # else
    #   render 'new'
    # end
  end

  def update
    article = Article.find(params[:id])
    article.update(article_params)
    respond_with Article, json: article

    # if @article.update(article_params)
    #   redirect_to @article
    # else
    #   render 'edit'
    # end
  end

  def destroy
    #@article = Article.find(params[:id])
    #@article.destroy
    respond_with Article.destroy(params[:id])

    #redirect_to articles_path
  end

  # Helper method for building JSON response- extract emails for author of each article
  # def get_emails(articles)
  #   emails = []
  #   articles.each do |a|
  #     u = User.find(a.user_id)
  #     emails.push(u.email)
  #   end
  #   return emails
  # end

  private
    def article_params
      params.require(:article).permit(:title, :text, :user_id)
    end

    # def find_article
    #   @article = Article.find(params[:id])
    # end
end
