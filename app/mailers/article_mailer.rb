class ArticleMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def due_date_email
    @user = params[:user]
    @article = params[:article]
    @url = 'localhost:3000/articles/' + @article.id.to_s
    mail(to: @user.email, subject: 'Article is Due Soon!')
  end
end
