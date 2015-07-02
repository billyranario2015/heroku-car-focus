class CreateProductOrders < ActiveRecord::Migration
  def change
    create_table :product_orders do |t|
      t.integer :group_id
      t.integer :manufacturer_id
      t.string :type
      t.string :car_brand

      t.timestamps null: false
    end
    add_index :product_orders, :group_id
    add_index :product_orders, :manufacturer_id
  end
end
