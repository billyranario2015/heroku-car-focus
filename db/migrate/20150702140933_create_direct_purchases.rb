class CreateDirectPurchases < ActiveRecord::Migration
  def change
    create_table :direct_purchases do |t|
      t.integer :category_id
      t.string :or_no
      t.string :in_charge
      t.integer :cash_on_hand
      t.string :product_name

      t.timestamps null: false
    end
    add_index :direct_purchases, :category_id
  end
end
