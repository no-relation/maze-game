class AddRowsAndColumnsToMazes < ActiveRecord::Migration[5.2]
  def change
    add_column :mazes, :rows, :integer
    add_column :mazes, :columns, :integer
  end
end
