class CreateDirectPurchases < ActiveRecord::Migration
  def change
    create_table :direct_purchases do |t|
      t.integer :group_id
      t.string :or_no
      t.string :in_charge
      t.string :cash_on_hand
      t.string :product_name

      t.timestamps null: false
    end
    add_index :direct_purchases, :group_id
  end
end
