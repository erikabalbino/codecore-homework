Rails.application.routes.draw do

  namespace :admin do
    resources :dashboard, only: [:index]
  end

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :edit, :create, :update]

  resources :posts do
    resources :comments, only: [:create, :destroy], shallow: true
    # The shallow argument will cause nested resource routes
    # to only be prefixed by the parent resource if it is
    # required. It's required for :index, :create
  end

  # Users/password
  get('/users/:id/editpassword', to: 'users#editpassword', as: :edit_password)
  patch('/users/:id/updatepassword', to: 'users#updatepassword', as: :update_password)

  # RESTful Post Routes
  # All CRUD operations

  # # Post#new
  # get('/posts/new', to: 'posts#new', as: :new_post)
  #
  # # Post#create
  # post('/posts', to: 'posts#create', as: :posts)
  #
  # # Post#index
  get('/', to: 'posts#index')
  #
  # # Post#show
  # get('/posts/:id', to: 'posts#show', as: :post)
  #
  # # Post#edit
  # get('/posts/:id/edit', to: 'posts#edit', as: :edit_post)
  #
  # # Post#update
  # patch('/posts/:id', to: 'posts#update')
  # put('/posts/:id', to: 'posts#update')
  #
  # # Post#destroy
  # delete('/posts/:id', to: 'posts#destroy', as: :delete_post)

end
