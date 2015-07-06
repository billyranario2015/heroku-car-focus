Rails.application.routes.draw do

  get 'categories/index'

  get 'services/index'

  resources :user, :services, :categories
  resources :inventories, except: :show
  devise_for :users
    
  devise_scope :user do

    authenticated :user do
      root 'user#index', as: :authenticated_root
      # get '*path' => 'application#index'
      get '/user/settings' => 'user#settings', as: 'user_settings'

      # for direct purchase routes
      match '/inventories/getManufacturerList' => 'inventories#getManufacturerList', via: [:get, :options]
      match '/inventories/submitDirectPurchase' => 'inventories#submitDirectPurchase', via: [:post, :options]
      match '/inventories/getDirectPurchases' => 'inventories#getDirectPurchases', via: [:get, :options]
      match '/inventories/:id/deleteDirectPurchase' => 'inventories#deleteDirectPurchase', via: [:get, :options]
      match '/inventories/:id/updateDirectPurchase' => 'inventories#updateDirectPurchase', via: [:post, :options]
      # end of product routes

      # for on stock routes
      match '/inventories/submitStock' => 'inventories#submitStock', via: [:post, :options]
      match '/inventories/createInventory' => 'inventories#createInventory', via: [:post, :options]
      match 'inventories/getInventoryStocks' => 'inventories#getInventoryStocks', via: [:get, :options]
      match 'inventories/:id' => 'inventories#deleteInventoryStock', via: [:get, :options]
      match 'inventories/:id' => 'inventories#updateInventoryStocks', via: [:post, :options]
      # end of on stock routes

    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end

  end
  
end
