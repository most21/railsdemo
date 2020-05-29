class Comment < ApplicationRecord
  belongs_to :article
  belongs_to :user

  scope :visible_comments, ->(user) { where(is_public: true).or(where(user_id: user.id)) }
end
