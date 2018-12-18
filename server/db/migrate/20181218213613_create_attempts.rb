class CreateAttempts < ActiveRecord::Migration[5.2]
  def change
    create_table :attempts do |t|
      t.belongs_to :player
      t.belongs_to :maze
      t.timestamps
    end
  end
end
