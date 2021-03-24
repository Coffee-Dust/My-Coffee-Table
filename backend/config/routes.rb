Rails.application.routes.draw do
  post 'login', to: 'sessions#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:show, :create] do
    get "coffee_table", to: 'coffee_tables#show'
  end
end
