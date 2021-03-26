Rails.application.routes.draw do

  post 'login', to: 'sessions#create'

  resources :users, only: [:show, :create] do

    get "coffee_table", to: 'coffee_tables#show'

    namespace 'coffee_table' do
      resources :elements
    end
    
  end

end
