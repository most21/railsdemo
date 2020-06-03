json.array! @articles do |article|
  json.id article.id
  json.title article.title
  json.text article.text
  json.created_at article.created_at
  json.updated_at article.updated_at
  json.user_id article.user_id
  json.author_email article.user.email
  json.cur_user current_user.id

  json.comments article.comments, :id, :commenter, :body, :article_id, :created_at, :updated_at, :is_public, :user_id
end
