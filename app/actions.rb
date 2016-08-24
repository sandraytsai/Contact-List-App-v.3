# Homepage (Root path)
require 'json'

get '/' do
  erb :index
end

get '/contacts' do 
  content_type :json
  @contacts = Contact.all
  @contacts.to_json 
end 

get '/contacts/search' do
  if params[:search].length ==0
    returns [].to_json
  else 
    Contact.select { |contact| 
      (contact.first_name.downcase =~ Regexp.new(params[:search].downcase)) || (contact.last_name.downcase =~ Regexp.new(params[:search].downcase))
    }.to_json 
  end 
end 

post '/contact/new' do
  content_type :json
  @contact = Contact.new(
    first_name: params[:firstname],
    last_name: params[:lastname],
    email: params[:email]
    )
  if @contact.save 
    @contact.to_json
  else
    @contact.errors.to_json
  end
end


delete '/contact/:id/delete' do
  @contact = Contact.find(params[:id])
  @contact.destroy
end 

get '/contact/:id/edit' do
end 

