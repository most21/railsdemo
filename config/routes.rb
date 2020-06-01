Rails.application.routes.draw do
  devise_for :users
  #get 'welcome/index'

  #root 'welcome#index'

  root to: redirect('/articles')

  get 'articles', to: 'welcome#index'
  get 'articles/new', to: 'welcome#index'
  get 'articles/:id', to: 'welcome#index'
  get 'articles/:id/edit', to: 'welcome#index'

  namespace :api do
    resources :articles, only: %i[index show new edit create update destroy] do
      resources :comments
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
