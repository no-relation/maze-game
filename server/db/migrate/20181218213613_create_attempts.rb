class CreateAttempts < ActiveRecord::Migration[5.2]
  def change
    create_table :attempts do |t|

      t.timestamps
    end
  end
end
