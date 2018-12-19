class CreateNodes < ActiveRecord::Migration[5.2]
  def change
    create_table :nodes do |t|
      t.integer :row
      t.integer :col
      t.belongs_to :maze
      t.integer :north_neighbor
      t.integer :east_neighbor
      t.integer :south_neighbor
      t.integer :west_neighbor
    end
  end
end
