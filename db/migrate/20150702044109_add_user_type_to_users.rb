class AddUserTypeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :user_type, :string
    add_column :users, :username, :string
  end
end
