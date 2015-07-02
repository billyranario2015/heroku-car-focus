Rails.application.routes.draw do

  get 'categories/index'

  get 'services/index'

  resources :user, :inventories, :services, :categories
  devise_for :users
    
  devise_scope :user do

    authenticated :user do
      root 'user#index', as: :authenticated_root
      get '*path' => 'application#index'
      get '/user/settings' => 'user#settings', as: 'user_settings'
      # get '/inventories/getServices' => 'inventories#getServices'
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end

  end
  
end
