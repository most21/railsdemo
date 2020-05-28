class Comment < ApplicationRecord
  belongs_to :article

  scope :visible_comments, ->(user) { where(is_public: true).or(where("user_id = ?", user.email)) }
end
