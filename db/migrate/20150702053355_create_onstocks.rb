class CreateOnstocks < ActiveRecord::Migration
  def change
    create_table :onstocks do |t|
      t.integer :group_id
      t.string :type

      t.timestamps null: false
    end
    add_index :onstocks, :group_id
  end
end
