class FixMessageColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :messages, :context, :content
  end
end
