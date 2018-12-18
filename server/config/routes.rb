Rails.application.routes.draw do
  resources :attempts
  resources :mazes
  resources :players
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
