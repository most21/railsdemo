class AddDetailsToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :is_public, :boolean
    add_column :comments, :user_id, :string
  end
end
