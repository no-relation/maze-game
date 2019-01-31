Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :attempts
      resources :mazes
      resources :players
      resources :auth
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    end
  end
  get '/', to: 'static#index'
  get '*other', to: redirect('/') 
end