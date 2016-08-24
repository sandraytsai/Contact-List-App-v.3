class AddContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |contact|
      contact.string :first_name
      contact.string :last_name
      contact.string :email
    end 
  end
end
