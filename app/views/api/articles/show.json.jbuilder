json.id @article.id
json.title @article.title
json.text @article.text
json.created_at @article.created_at
json.updated_at @article.updated_at
json.user_id @article.user_id
json.comments @article.comments, :commenter, :body, :article_id, :created_at, :updated_at, :is_public, :user_id