class CreateMazes < ActiveRecord::Migration[5.2]
  def change
    create_table :mazes do |t|
      t.integer :rows
      t.integer :columns
      t.integer :high_score
      t.belongs_to :start_node
      t.belongs_to :end_node
      t.timestamps
    end
  end
end
