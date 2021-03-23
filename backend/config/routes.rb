Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:show, :create] do
    get "coffee_table", to: 'coffee_tables#show'
  end
end
