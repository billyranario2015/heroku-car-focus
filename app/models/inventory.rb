class Inventory < ActiveRecord::Base
  belongs_to :user_info
  has_many :category

  
end
